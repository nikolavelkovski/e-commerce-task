import express from "express";
import * as variantController from "../controllers/variantController";

const router = express.Router();

router.get("/variants", variantController.getVariants);
router.post("/variants", variantController.createVariant);
router.patch("/variants/:id", variantController.updateVariant);
router.delete("/variants/:id", variantController.deleteVariant);

export default router;
