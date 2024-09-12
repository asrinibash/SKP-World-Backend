import { Router } from "express";

const rootRouter: Router = Router();
import adminRoutes from "./adminRoutes";
import userRoutes from "./userRoutes";
import categoryRoutes from"./categoryRoutes";
import courseRoutes from "./courseRoutes";
import groupRoutes from "./groupRoutes";

// * Admin Routes
rootRouter.use("/admin", adminRoutes);

// * User Routes
rootRouter.use("/user", userRoutes);

// * Category Routes
rootRouter.use("/category", categoryRoutes);

// * Course Routes
rootRouter.use("/course", courseRoutes)

// * Group Routes
rootRouter.use("/group", groupRoutes)
export default rootRouter;
