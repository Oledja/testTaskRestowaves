import { BrandRepository } from "../repositories/BrandRepository.js";

export class BrandService {
	#brandRepository = new BrandRepository();

	getBrands = async () => {
		try {
			return await this.#brandRepository.getBrands();
		} catch (error) {
			throw error
		}
	}

	getBrandById = async (id) => {
		try {
			return await this.#brandRepository.getBrandById(id);
		} catch (error) {
			throw error
		}
	}

	createBrand = async (brand) => {
		try {
			const { name } = brand
			const candidate = await this.#brandRepository.getBrandByName(name);

			if (candidate) {
				throw new Error(`Brand with name <${name}> already exists`);
			}
			
			return await this.#brandRepository.createBrand(brand);
		} catch (error) {
			throw error
		}
	}

	updateBrand = async (id, brand) => {
		try {
			const { name } = brand
			const candidate = await this.#brandRepository.getBrandByName(name);

			if (candidate) {
				throw new Error(`Brand with name <${name}> already exists`);
			}

			await this.#brandRepository.updateBrand(id, brand);
		} catch (error) {
			throw error
		}
	}

	deleteBrand = async (id) => {
		try {
			await this.#brandRepository.deleteBraand(id);
		} catch (error) {
			throw error;
		}
	}
}