# ReguSphere 360 - Pharmaceutical Regulatory Affairs Consultancy Platform

ReguSphere 360 is an enterprise-grade web platform for pharmaceutical companies, regulatory professionals, and biotech startups. It delivers end-to-end regulatory strategy, ICH CTD/eCTD dossier structuring, pre-submission gap assessments, GxP SOP control systems, and health authority submission gate readiness.

---

> ### 📱 Live Mobile & Remote Monitoring Links
> - **Direct Public Preview (Mobile & Remote - Instant, No Password):**  
>   👉 **[https://preventing-volvo-apnic-shakespeare.trycloudflare.com](https://preventing-volvo-apnic-shakespeare.trycloudflare.com)**
> - **Local Wi-Fi Network (Phone on same Wi-Fi):** [http://192.168.1.73:5173/](http://192.168.1.73:5173/)
> - **Localhost (PC only):** [http://localhost:5173/](http://localhost:5173/)
> - **Backend API Health Check:** [http://localhost:5000/api/health](http://localhost:5000/api/health)
>
> *(Continuously synced with local workspace edits in real-time)*

---

## 🏛️ Core Service 1: Regulatory Documentation Consultancy

Helping pharma enterprises, biotechs, and CROs organize, write, audit, and submit dossiers to global health authorities (**US FDA, EMA, Health Canada, CDSCO, TGA, MHRA, PMDA**).

### Specialized Sub-Services:
1. **ICH CTD/eCTD Dossier Structure & Document Indexing**
   - Modules 1 to 5 granular XML folder structure
   - Leaf document PDF/A formatting, bookmarks, and cross-module hyperlinking
   - eCTD v3.2.2 & v4.0 validation standards (Lorenz / FDA ESG Gateway)
2. **Regulatory Document Gap Assessments**
   - Red/Amber/Green risk matrix for CMC, Non-clinical, and Clinical dossiers
   - Refuse-to-File (RTF) and Complete Response Letter (CRL) avoidance roadmaps
   - Scientific justification briefs for bridging studies & analytical comparability
3. **SOP Preparation, Review & Document Control Support**
   - GxP compliant SOP master templates (RA, QA/QC, Pharmacovigilance)
   - Change control impact assessments and document versioning matrices
   - FDA 21 CFR Part 11 & EU Annex 11 electronic signature audit procedures
4. **Regulatory Submission Readiness Checklists**
   - Health authority gate sign-off certification
   - Module 1 administrative form audits (FDA 356h / EU Application form)
   - Real-time batch stability and release CoAs verification
5. **Regulatory Writing & Documentation Consistency Reviews**
   - Module 2 Clinical & Non-clinical Overviews line-by-line concordance
   - Module 2.3 Quality Overall Summary (QOS) drafting & scientific polish
   - Clinical Study Report (CSR) ICH E3 synchronization
6. **Post-Approval Change Documentation Support**
   - Variation classification (Type IA, IB, II / FDA PAS, CBE-0, CBE-30)
   - Manufacturing site transfer & CMC comparability dossiers
   - Annual reports and renewal submissions

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Tailwind CSS, Lucide Icons, Vite, Axios
- **Backend**: Node.js, Express.js, Multer (multipart document intake), Morgan
- **Database**: MongoDB Atlas with Mongoose (with dual-mode in-memory resilience)
- **Authentication**: Google Firebase Authentication (with instant testing demo mode)

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18+ or v20+)
- npm

### 2. Environment Setup

#### Backend (`server/.env`):
```env
PORT=5000
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.xmtbb6o.mongodb.net/regusphere?retryWrites=true&w=majority"
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```
> **MongoDB Atlas Note**: Ensure your IP address is whitelisted in your **MongoDB Atlas Console** under `Network Access` (or add `0.0.0.0/0` to allow access from anywhere). The backend automatically operates with an in-memory repository cache if the database is in the process of connecting.

#### Frontend (`client/.env`):
```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```
> **Firebase Note**: If Firebase keys are not yet configured, the platform features a built-in 1-click **Instant Google Demo Profile** so you can test authenticated project tracking and profile management without any blocking delay.

---

### 3. Running the Applications

#### Run Backend Server:
```bash
cd server
npm install
npm run dev
```
Backend runs on: `http://localhost:5000`  
Health check: `http://localhost:5000/api/health`

#### Run Frontend Client:
```bash
cd client
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## 🌟 Interactive Platform Features

1. **Quotation & Scoping Request Form**:
   - Multi-step questionnaire selecting services, target health agencies, dossier format, and urgency.
   - Live estimation calculator computing business days, cost range, and included deliverables in real time.
   - Multipart confidential document upload supporting PDF, DOCX, XLSX, ZIP dossiers.
   - Generates official Project Tracking IDs (e.g. `REG-2026-XXXX`).

2. **ICH CTD Deliverables Explorer**:
   - Interactive tree breakdown of Modules 1 through 5.
   - Sample Regulatory Gap Analysis Matrix with risk scoring.
   - GxP SOP control hierarchy and 21 CFR Part 11 compliance standards.

3. **Regulatory Submission Readiness Audit Tool**:
   - Interactive 22-point audit checklist across Modules 1-5 and SOP document governance.
   - Calculates real-time compliance percentage score and tier (`High Risk`, `Moderate`, `Submission Ready`).
   - One-click import that transfers flagged gaps directly into a new Quotation Request.

4. **Live Project Tracking Portal**:
   - Real-time tracking by ID (try sample: `REG-2026-1001` or newly submitted ID).
   - Milestone progress visualization (`Enquiry Received` -> `Document Scoping` -> `Gap Assessment` -> `Ready for Submission`).
   - Lead RAC Consultant card and uploaded documents inspector.
