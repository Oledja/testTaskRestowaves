import { Product } from "../entities/Product.js";
import { dataSource } from "../db/connection.js";


export class ProductRepository {
	#db = dataSource.getRepository(Product);

	getProductById = async (id) => {
		return await this.#db.findOne({
			where: { id },
			relations: [ "model", "brand", "categories" ]
		});
	}

	getProductsByBrands = async (brandsIds) => {
		return await this.#db.find({
			where: [
				{ brand: [...brandsIds] },
			]
		});
	}

	getProductsByModels= async (modelsIds) => {
		return await this.#db.find({
			where: [
				{ model: [...modelsIds] },
			]
		});
	}

	getProductsByCategory = async (categoriesIds) => {
		return await this.#db.find({
			where: [
				{ categories: [...categoriesIds] },
			]
		});
	}

	getProductByModelAndCode = async (model, code) => {
		const [result] = await this.#db.findBy({ model, code });
		return result;
	}

	getProducts = async () => {
		return await this.#db.find();
	}

	createProduct = async (product) => {
		return await this.#db.save(product);
	}


	updateProduct = async (id, product) => {
		return await this.#db.update({ id }, product);
	}
}	