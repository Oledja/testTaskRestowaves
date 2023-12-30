import { BrandService } from "../services/BrandService.js";

export class BrandController {
	#brandService = new BrandService();

	getBrands = async (req, res) => {
		try {
			const response = await this.#brandService.getBrands();
			res.status(200).json(response);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	getBrandById = async (req, res) => {
		try {
			const { id } = req.params;
			const response = await this.#brandService.getBrandById(id);
			res.status(200).json(response)
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	createBrand = async (req, res) => {
		try {
			const brand = req.body;
			const response = await this.#brandService.createBrand(brand);
			res.status(200).json(response)
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	updateBrand = async (req, res) => {
		try {
			const { id } = req.params;
			const brand = req.body;
			await this.#brandService.updateBrand(id, brand);
			res.status(200).json(`Brand with id: <${id}> updated successfully`);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	deleteBrand = async (req, res) => {
		try {
			const { id } = req.params;
			await this.#brandService.deleteBrand(id);
			res.status(200).json(`Brand with id: <${id}> deleted successfully`);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

} 