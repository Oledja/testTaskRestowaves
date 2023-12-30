import { dataSource } from "../db/connection.js";
import { Model } from "../entities/Model.js";

export class ModelRepository {
	#db = dataSource.getRepository(Model);

	getModels = async () => {
		return await this.#db.find();
	}

	getModelById = async (id) => {
		const [result] = await this.#db.findBy({ id });
		return result;
	}

	getModelByName = async (name) => {
		const [result] = await this.#db.findBy({ name });
		return result;
	}

	createModel = async (model) => {
		return await this.#db.save(model);
	}


	updateModel = async (id, model) => {
		return await this.#db.update({ id }, model);
	}

	deleteModel = async (id) => {
		await this.#db.delete(id);
	}
}