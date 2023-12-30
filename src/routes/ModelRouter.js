import Router from "express";
import { ModelController } from "../controllers/ModelController.js";

const modelRouter = Router();
const modelController = new ModelController();

modelRouter.get("/models", modelController.getModels);
modelRouter.get("/models/:id", modelController.getModelById);
modelRouter.post("/models", modelController.createModel);
modelRouter.put("/models/:id", modelController.updateModel);
modelRouter.delete("/models/:id", modelController.deleteModel);


export { modelRouter }