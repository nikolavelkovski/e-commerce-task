import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Variant } from "../models/Variant";
import { Product } from "../models/Product";
import { HttpStatusCodes } from "../utils/httpStatusCodes";

export const getVariants = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const variantRepository = AppDataSource.getRepository(Variant);
    const variants = await variantRepository.find();
    return res.json(variants);
  } catch (error) {
    console.error("Error getting variants:", error);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to get variants" });
  }
};

export const createVariant = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, price, productId, description } = req.body;
    const variantRepository = AppDataSource.getRepository(Variant);

    const product = await AppDataSource.getRepository(Product).findOne({
      where: { id: productId },
    });
    if (!product) {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ message: "Product not found" });
    }

    const variant = new Variant();
    variant.name = name;
    variant.price = price;
    variant.product = product;
    variant.description = description;

    await variantRepository.save(variant);
    return res.status(HttpStatusCodes.CREATED).json(variant);
  } catch (error) {
    console.error("Error creating variant:", error);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to create variant" });
  }
};

export const updateVariant = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name, price, productId } = req.body;
    const variantRepository = AppDataSource.getRepository(Variant);

    const variant = await variantRepository.findOne({ where: { id } });
    if (!variant) {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ message: "Variant not found" });
    }

    const product = await AppDataSource.getRepository(Product).findOne(
      productId
    );
    if (!product) {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ message: "Product not found" });
    }

    variant.name = name;
    variant.price = price;
    variant.product = product;

    await variantRepository.save(variant);
    return res.json(variant);
  } catch (error) {
    console.error("Error updating variant:", error);
    return res.status(500).json({ message: "Failed to update variant" });
  }
};

export const deleteVariant = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const variantRepository = AppDataSource.getRepository(Variant);

    const variant = await variantRepository.findOne({ where: { id } });
    if (!variant) {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ message: "Variant not found" });
    }

    await variantRepository.remove(variant);
    return res.status(HttpStatusCodes.NO_CONTENT).send();
  } catch (error) {
    console.error("Error deleting variant:", error);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to delete variant" });
  }
};
