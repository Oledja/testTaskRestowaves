import { dataSource } from "../db/connection.js";
import { Category } from "../entities/Category.js";

export class CategoryRepository {
	#db = dataSource.getRepository(Category);

	getCategories = async () => {
		return await this.#db.find();
	}

	getCategoryByName = async (name) => {
		const [result] = await this.#db.findBy({ name });
		return result;
	}

	getCategoryById = async (id) => {
		return await this.#db.findOne({
			where: { id },
			relations: ["parentCategory"],
		});
	}

	getSubCategories = async (id) => {
		return await this.#db.find({
			where: { parentCategory: { id } },
		});
	}

	createCategory = async (category) => {
		return await this.#db.save(category);
	}

	updateCategory = async (id, category) => {
		return await this.#db.update({ id }, category);
	}

	deleteCategory = async (id) => {
		await this.#db.delete(id);
	}

}