import { Router } from "express";

const rootRouter: Router = Router();
import adminRoutes from "./adminRoutes";
import userRoutes from "./userRoutes";

// * Admin Routes
rootRouter.use("/admin", adminRoutes);

// * User Routes
rootRouter.use("/user", userRoutes);
export default rootRouter;
