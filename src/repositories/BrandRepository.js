import { dataSource } from "../db/connection.js";
import { Brand } from "../entities/Brand.js";


export class BrandRepository {
	#db = dataSource.getRepository(Brand);

	getBrands = async () => {
		return await this.#db.find();
	}

	getBrandById = async (id) => {
		const [result] =  await this.#db.findBy({ id });
		return result;
	}

	getBrandByName = async (name) => {
		const [result] = await this.#db.findBy({ name });
		return result;
	}

	createBrand = async (brand) => {
		return await this.#db.save(brand);
	}
	
	updateBrand = async (id, brand) => {
		await this.#db.update({ id }, brand);
	}

	deleteBraand = async (id) => {
		await this.#db.delete(id);
	}
}