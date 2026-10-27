import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static uploads directory
app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'ReguSphere 360 Pharma Regulatory API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    services: [
      'ICH CTD/eCTD Dossier Structure & Indexing',
      'Regulatory Document Gap Assessments',
      'SOP Preparation & Document Control Support',
      'Regulatory Submission Readiness Checklists',
      'Regulatory Writing & Documentation Consistency Reviews',
      'Post-Approval Change Documentation Support',
    ],
  });
});

// API Routes
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/assessments', assessmentRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[API Error]:', err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error in ReguSphere backend.',
  });
});

app.listen(PORT, () => {
  console.log(`[ReguSphere 360 Server] Running on http://localhost:${PORT}`);
  console.log(`[ReguSphere 360 Server] Health check: http://localhost:${PORT}/api/health`);
});
