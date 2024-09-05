import { Router } from "express";

const rootRouter: Router = Router();
import adminRoutes from "./adminRoutes";
import userRoutes from "./userRoutes";
import categoryRoutes from"./categoryRoutes";

// * Admin Routes
rootRouter.use("/admin", adminRoutes);

// * User Routes
rootRouter.use("/user", userRoutes);

// * Category Routes
rootRouter.use("/category", categoryRoutes);
export default rootRouter;
