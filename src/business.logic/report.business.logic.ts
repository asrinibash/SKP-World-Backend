import { prismaClient } from "../index";
import { Report } from "@prisma/client";
import { BadRequestExpection } from "../errorHandle/BadRequestExpection";
import { NotFoundException } from "../errorHandle/NotFoundException";
import { ErrorCode } from "../errorHandle/root";

// Add New Report
export const addReport = async (data: {
  title: string;
  description?: string;
  reportType: string;
  generatedById: string;
}): Promise<Report> => {
  try {
    const { title, description, reportType, generatedById } = data;

    // Create the new report
    const report = await prismaClient.report.create({
      data: {
        title,
        description,
        reportType,
        status: "PENDING", // Default status set to 'PENDING'
        generatedById,
      },
    });

    return report;
  } catch (error) {
    console.error("Error in addReport:", error);
    throw new BadRequestExpection("Failed to create report", ErrorCode.BAD_REQUEST);
  }
};

// Get All Reports
export const getAllReports = async (): Promise<Report[]> => {
  return await prismaClient.report.findMany();
};

// Update Report Status
export const updateReportStatus = async (id: string, status: string): Promise<Report> => {
  const report = await prismaClient.report.findUnique({ where: { id } });

  if (!report) {
    throw new NotFoundException("Report not found", ErrorCode.NOT_FOUND);
  }

  const updatedReport = await prismaClient.report.update({
    where: { id },
    data: { status },
  });

  return updatedReport;
};
