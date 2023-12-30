import Router from "express";
import { ProductController } from "../controllers/ProductController.js";

const productRouter = Router();
const productController = new ProductController();

productRouter.get("/products", productController.getProducts);
productRouter.get("/products/:id", productController.getProductById);
productRouter.get("/products/sizes/:size", productController.getProductsBySize);
productRouter.get("/products/categories/:categoryId", productController.getProductByCategory);
productRouter.post("/products/models", productController.getProductByModels);
productRouter.post("/products/brands/", productController.getProductByBrands);
productRouter.post("/products/:id/categories", productController.addCategoryToProduct);
productRouter.post("/products/:id/brands", productController.addBrandToProduct);
productRouter.post("/products/:id/models", productController.addModelToProduct);
productRouter.put("/products/:id", productController.updateProductName);
productRouter.delete("/products/:id/categories", productController.deleteCategoryFromProduct);

export { productRouter }