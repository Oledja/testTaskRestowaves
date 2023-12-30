import { CategoryService } from "../services/CategoryService.js";

export class CategoryController {
	#categoryService = new CategoryService();

	getCategories = async (req, res) => {
		try {
			const response = await this.#categoryService.getCategories();
			res.status(200).json(response);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	getCategoryById = async (req, res) => {
		try {
			const { id } = req.params;
			const response = await this.#categoryService.getCategoryById(id);
			res.status(200).json(response);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	createCategory = async (req, res) => {
		try {
			const category = req.body;
			const response = await this.#categoryService.createCategory(category);
			res.status(200).json(response);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	createSubCategory = async (req, res) => {
		try {
			const { id } = req.params;
			const subCategory = req.body;
			const response = await this.#categoryService.createSubCategory(id, subCategory);
			res.status(200).json(response);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	updateCategory = async (req, res) => {
		try {
			const { id } = req.params;
			const category = req.body;
			await this.#categoryService.updateCategory(id, category);
			res.status(200).json(`Category with id <${id}> updated successfully`);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	deleteCategory = async (req, res) => {
		try {
			const { id } = req.params;
			await this.#categoryService.deleteCategory(id);
			res.status(200).json(`Category with id <${id}> deleted successfully`);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}
}