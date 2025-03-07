import { Router } from "express";

const rootRouter: Router = Router();
import adminRoutes from "./adminRoutes";
import userRoutes from "./userRoutes";
import categoryRoutes from "./categoryRoutes";
import courseRoutes from "./courseRoutes";
import groupRoutes from "./groupRoutes";
import orderRoutes from "./orderRoutes";
import paymentRoutes from "./paymentRoutes";
import reportRoutes from "./reportRoutes";
import contactRoutes from "./contactRoutes";
import commentRoutes from "./commentRoutes";

// * Admin Routes
rootRouter.use("/admin", adminRoutes);

// * User Routes
rootRouter.use("/user", userRoutes);

// * Category Routes
rootRouter.use("/category", categoryRoutes);

// * Course Routes
rootRouter.use("/course", courseRoutes);

// *Order Routes
rootRouter.use("/order", orderRoutes);

// *Order Routes
rootRouter.use("/payment", paymentRoutes);

// * Group Routes
rootRouter.use("/group", groupRoutes);

//*Report Routes
rootRouter.use("/report", reportRoutes);

//*Contact Routes
rootRouter.use("/contact", contactRoutes);

//*Comment Routes
rootRouter.use("/comment", commentRoutes);
export default rootRouter;
