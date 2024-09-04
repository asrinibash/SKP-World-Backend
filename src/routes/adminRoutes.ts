import { Router } from "express";
import {
  signupAdminController,
  loginAdminController,
  getAllAdminsController,
  getAdminByIdController,
  updateAdminController,
  deleteAdminByIdController,
  deleteAllAdminsController,
} from "../controllers/Admin-controller";

const adminRoutes = Router();

adminRoutes.post("/signup", signupAdminController);
adminRoutes.post("/login", loginAdminController);
adminRoutes.get("/", getAllAdminsController);
adminRoutes.get("/:id", getAdminByIdController);
adminRoutes.put("/:id", updateAdminController);
adminRoutes.delete("/:id", deleteAdminByIdController);
// adminRoutes.delete("/", deleteAllAdminsController);   // for testing purposes

export default adminRoutes;
