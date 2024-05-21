import express from "express";
import productRoutes from "./productRoutes";
import variantRoutes from "./variantRoutes";

const router = express.Router();

router.use(productRoutes);
router.use(variantRoutes);

export default router;
