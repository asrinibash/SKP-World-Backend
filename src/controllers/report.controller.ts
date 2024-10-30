import { Request, Response, NextFunction } from "express";
import { addReport, getAllReports, updateReportStatus } from "../business.logic/report.business.logic";

// Add New Report Controller
export const addReportController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const report = await addReport(req.body);
    res.status(201).json(report);
  } catch (error) {
    next(error);
  }
};

// Get All Reports Controller
export const getAllReportsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reports = await getAllReports();
    res.status(200).json(reports);
  } catch (error) {
    next(error);
  }
};

// Update Report Status Controller
export const updateReportStatusController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedReport = await updateReportStatus(id, status);
    res.status(200).json(updatedReport);
  } catch (error) {
    next(error);
  }
};
