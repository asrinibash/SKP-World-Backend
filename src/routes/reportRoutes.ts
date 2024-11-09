import { Router } from "express";
import {
  addReportController,
  getAllReportsController,
  updateReportStatusController,
} from "../controllers/report.controller";

const router = Router();

// Add New Report
router.post("/", addReportController);

// Get All Reports
router.get("/", getAllReportsController);

// Update Report Status
router.patch("/:id/status", updateReportStatusController);

export default router;
