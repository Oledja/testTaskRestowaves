import Router from "express";
import { BrandController } from "../controllers/BrandController.js";

const brandRouter = Router();
const brandController = new BrandController()

brandRouter.get("/brands", brandController.getBrands);
brandRouter.get("/brands/:id", brandController.getBrandById);
brandRouter.post("/brands", brandController.createBrand);
brandRouter.put("/brands/:id", brandController.updateBrand);
brandRouter.delete("/brands/:id", brandController.deleteBrand);

export { brandRouter }