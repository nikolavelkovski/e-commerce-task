import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../models/Product";
import { HttpStatusCodes } from "../utils/httpStatusCodes";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const productRepository = AppDataSource.getRepository(Product);
  const products = await productRepository.find({ relations: ["variants"] });
  return res.status(HttpStatusCodes.OK).json(products);
};

export const getProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const productRepository = AppDataSource.getRepository(Product);
  const product = await productRepository.findOne({
    where: { id },
    relations: ["variants"],
  });
  if (product) {
    return res.status(HttpStatusCodes.OK).json(product);
  } else {
    return res.status(HttpStatusCodes.NOT_FOUND).send("Product not found");
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const productRepository = AppDataSource.getRepository(Product);
  const product = productRepository.create(req.body);
  const result = await productRepository.save(product);
  return res.status(HttpStatusCodes.CREATED).json(result);
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const productRepository = AppDataSource.getRepository(Product);

    const existingProduct = await productRepository.findOne({
      where: { id: productId },
    });
    if (!existingProduct) {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ error: "Product not found" });
    }

    const updatedFields = req.body;

    Object.assign(existingProduct, updatedFields);

    await productRepository.save(existingProduct);

    res.json(existingProduct);
  } catch (error) {
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to update product" });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const productRepository = AppDataSource.getRepository(Product);
  const result = await productRepository.delete(id);
  if (result.affected === 1) {
    return res.status(HttpStatusCodes.OK).send("Product deleted");
  } else {
    return res.status(HttpStatusCodes.NOT_FOUND).send("Product not found");
  }
};
