import { ModelRepository } from "../repositories/ModelRepository.js";


export class ModelService {
	#modelRepository = new ModelRepository();

	getModels = async () => {
		try {
			return await this.#modelRepository.getModels();	
		} catch (error) {
			throw error;
		}
	}

	getModelById = async (id) => {
		try {
			const model = await this.#modelRepository.getModelById(id);

			if (!model) {
				throw new Error(`Model with id <${id}> doesn't exists`);
			}

			return model;
		} catch (error) {
			throw error;
		}
	}

	getModelByName = async (name) => {
		try {
			const model = await this.#modelRepository.getModelByName(name);

			if (!model) {
				return null;
			}

			return model;
		} catch (error) {
			throw error;
		}
	}

	createModel = async (model) => {
		try {
			const { name } = model
			const candidate = await this.#modelRepository.getModelByName(name);

			if (candidate) {
				throw new Error(`Model with name <${name}> already exists`);
			}

			return await this.#modelRepository.createModel(model);
		} catch (error) {
			throw error
		}
	}

	updateModel = async (id, model) => {
		try {
			const { name } = model
			const candidate = await this.#modelRepository.getModelByName(name);

			if (candidate) {
				throw new Error(`Model with name <${name}> already exists`);
			}

			await this.#modelRepository.updateModel(id, model);
		} catch (error) {
			throw error;
		}
	}

	deleteModel = async (id) => {
		try {
			await this.#modelRepository.deleteModel(id);
		} catch (error) {
			throw error;
		}
	}
 }