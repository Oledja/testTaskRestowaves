import Router from "express";
import { CategoryController } from "../controllers/CategoryController.js";

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.get("/categories", categoryController.getCategories);
categoryRouter.get("/categories/:id", categoryController.getCategoryById);
categoryRouter.post("/categories", categoryController.createCategory);
categoryRouter.post("/categories/sub/:id", categoryController.createSubCategory);
categoryRouter.put("/categories/:id", categoryController.updateCategory);
categoryRouter.delete("/categories/:id", categoryController.deleteCategory);

export { categoryRouter }