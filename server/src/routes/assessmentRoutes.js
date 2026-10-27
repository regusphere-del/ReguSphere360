import express from 'express';
import mongoose from 'mongoose';
import { ReadinessAssessment } from '../models/ReadinessAssessment.js';

const router = express.Router();

const memoryAssessments = [];

// Helper to evaluate checklist and generate audit findings
router.post('/evaluate', async (req, res) => {
  try {
    const {
      companyName = 'Regulatory Partner',
      contactEmail,
      dossierFormat = 'eCTD v3.2.2',
      targetMarket = 'US FDA',
      answers = {},
      firebaseUid,
    } = req.body;

    const categories = {
      module1Admin: ['m1_app_form', 'm1_cover_letter', 'm1_labeling', 'm1_letters_auth'],
      module2Summaries: ['m2_intro', 'm2_cmc_summary', 'm2_nonclin_overview', 'm2_clin_overview'],
      module3QualityCMC: ['m3_drug_substance', 'm3_drug_product', 'm3_stability_data', 'm3_batch_analysis'],
      module4Nonclinical: ['m4_pharm_reports', 'm4_tox_reports', 'm4_glp_compliance'],
      module5Clinical: ['m5_protocol_compliance', 'm5_gcp_docs', 'm5_csr_complete', 'm5_safety_updates'],
      sopCompliance: ['sop_change_ctrl', 'sop_doc_versioning', 'sop_archive_retention'],
    };

    let totalPoints = 0;
    let maxPoints = 0;
    const categoryBreakdown = {};
    const flaggedGaps = [];
    const recommendations = [];

    const labelMap = {
      m1_app_form: 'Module 1: Regional Application Form (e.g. FDA 356h / EU Annex)',
      m1_cover_letter: 'Module 1: Formal Regulatory Cover Letter with submission rationale',
      m1_labeling: 'Module 1: Package Insert, Summary of Product Characteristics (SmPC) & Container Labels',
      m1_letters_auth: 'Module 1: Letters of Authorization (LOA) for DMFs/ASMFs',
      m2_intro: 'Module 2: General Introduction to the Medicinal Product',
      m2_cmc_summary: 'Module 2.3: Quality Overall Summary (QOS) with justification for specifications',
      m2_nonclin_overview: 'Module 2.4/2.6: Non-Clinical Overview & Summary tables',
      m2_clin_overview: 'Module 2.5/2.7: Clinical Overview & Benefit-Risk assessment',
      m3_drug_substance: 'Module 3.2.S: Drug Substance Characterization, Impurities & Synthesis Route',
      m3_drug_product: 'Module 3.2.P: Drug Product Composition, Process Validation & Control of Excipients',
      m3_stability_data: 'Module 3.2.P.8: ICH Q1A Accelerated & Real-time Stability Profiles (12+ months)',
      m3_batch_analysis: 'Module 3.2.P.5: Representative Commercial/Pilot Batch Release Data & CoAs',
      m4_pharm_reports: 'Module 4: Primary & Secondary Pharmacodynamics / Safety Pharmacology',
      m4_tox_reports: 'Module 4: Repeat-Dose Toxicology and Genotoxicity Audited Reports',
      m4_glp_compliance: 'Module 4: GLP Compliance Statements and QA Audit Certificates',
      m5_protocol_compliance: 'Module 5: Clinical Protocol Approvals, IRB/IEC Approvals & Consent forms',
      m5_gcp_docs: 'Module 5: GCP Compliance Declarations & Investigator Brochures',
      m5_csr_complete: 'Module 5: Fully reconciled Clinical Study Reports (CSR) with Appendices',
      m5_safety_updates: 'Module 5: Periodic Safety Update / Annual Safety Summaries',
      sop_change_ctrl: 'SOP Document Control: Formal change history and impact assessment tracking',
      sop_doc_versioning: 'SOP Versioning: Controlled document watermarking and audit trail logs',
      sop_archive_retention: 'SOP Archiving: GxP 21 CFR Part 11 compliant archive and electronic signatures',
    };

    for (const [catKey, questionIds] of Object.entries(categories)) {
      let catScore = 0;
      questionIds.forEach((qId) => {
        maxPoints++;
        if (answers[qId] === true) {
          catScore++;
          totalPoints++;
        } else {
          flaggedGaps.push(labelMap[qId] || qId);
        }
      });
      categoryBreakdown[catKey] = Math.round((catScore / questionIds.length) * 100);
    }

    const overallScore = Math.round((totalPoints / maxPoints) * 100);

    let readinessTier = 'High Risk (Major Gaps)';
    if (overallScore >= 80) {
      readinessTier = 'Submission Ready (Minor Polishing)';
      recommendations.push(
        'Conduct eCTD XML backbone validation check (e.g. Lorenz / FDA ESG Gateway testing).',
        'Verify all leaf document hyperlinking and PDF bookmarks adhere to ICH Granularity guidelines.',
        'Obtain final RAC Sign-off on Regional Module 1 administrative documents.'
      );
    } else if (overallScore >= 50) {
      readinessTier = 'Moderate Readiness (Action Needed)';
      recommendations.push(
        'Remediate missing Quality/CMC Module 3 stability or batch analysis documentation.',
        'Complete Module 2 summaries to provide scientific bridges to Module 4 and 5 data.',
        'Standardize SOP document control numbers and ensure signature audit trail readiness.'
      );
    } else {
      readinessTier = 'High Risk (Major Gaps)';
      recommendations.push(
        'Commission an urgent Regulatory Gap Assessment to draft remediation roadmap before submission dates.',
        'Structure raw study dossiers into ICH compliant eCTD folders and leaf document indexes.',
        'Engage regulatory medical writing specialists to draft missing non-clinical or clinical overviews.'
      );
    }

    const assessmentDoc = {
      companyName,
      contactEmail: contactEmail || 'pending@consultancy.client',
      dossierFormat,
      targetMarket,
      overallScore,
      readinessTier,
      categoryBreakdown,
      flaggedGaps,
      recommendations,
      assessmentSummary: `Assessed ${totalPoints} / ${maxPoints} readiness indicators (${overallScore}% compliance) targeting ${targetMarket} ${dossierFormat}.`,
      firebaseUid,
      createdAt: new Date(),
    };

    if (contactEmail && mongoose.connection.readyState === 1) {
      const assessment = new ReadinessAssessment(assessmentDoc);
      await assessment.save();
    }
    memoryAssessments.unshift(assessmentDoc);

    res.json({
      success: true,
      assessment: assessmentDoc,
    });
  } catch (error) {
    console.error('Error calculating readiness:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET: Recent assessments
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const list = await ReadinessAssessment.find().sort({ createdAt: -1 }).limit(10);
      if (list.length > 0) {
        return res.json({ success: true, assessments: list });
      }
    }
    res.json({ success: true, assessments: memoryAssessments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
