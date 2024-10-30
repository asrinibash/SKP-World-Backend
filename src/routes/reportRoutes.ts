import { Router } from "express";
import {
  addReportController,
  getAllReportsController,
  updateReportStatusController,
} from "../controllers/report.controller";

const router = Router();

// Add New Report
router.post("/reports", addReportController);

// Get All Reports
router.get("/reports", getAllReportsController);

// Update Report Status
router.patch("/reports/:id/status", updateReportStatusController);

export default router;
