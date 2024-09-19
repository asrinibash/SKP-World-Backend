import { Router } from "express";
import {
  signupAdminController,
  loginAdminController,
  getAllAdminsController,
  getAdminByIdController,
  updateAdminController,
  deleteAdminByIdController,
  deleteAllAdminsController,
  uploadAdminImageController,
} from "../controllers/admin.controller";
import upload from "../multer/multer.config";

const adminRoutes = Router();

adminRoutes.post("/signup", signupAdminController);
adminRoutes.post("/login", loginAdminController);
adminRoutes.get("/", getAllAdminsController);
adminRoutes.get("/:id", getAdminByIdController);
adminRoutes.put("/:id", updateAdminController);
adminRoutes.delete("/:id", deleteAdminByIdController);
// adminRoutes.delete("/", deleteAllAdminsController);   // for testing purposes
adminRoutes.post(
  "/:adminId/upload",
  upload.single("image"),
  uploadAdminImageController
);

export default adminRoutes;
