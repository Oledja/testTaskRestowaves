import { ModelService } from "../services/ModelService.js";


export class ModelController {
	#modelService = new ModelService();

	getModels = async (req, res) => {
		try {
			const response = await this.#modelService.getModels();
			res.status(200).json(response);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	getModelById = async (req, res) => {
		try {
			const { id } = req.params;
			const response = await this.#modelService.getModelById(id);
			res.status(200).json(response);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	createModel = async (req, res) => {
		try {
			const model = req.body;
			const response = await this.#modelService.createModel(model);
			res.status(200).json(response);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	updateModel = async (req, res) => {
		try {
			const { id } = req.params;
			const model = req.body;
			await this.#modelService.updateModel(id, model);
			res.status(200).json(`Model with id <${id}> updated successfully`);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	deleteModel =  async (req, res) => {
		try {
			const { id } = req.params;
			await this.#modelService.deleteModel(id);
			res.status(200).json(`Model with id <${id}> deleted successfully`);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}
}