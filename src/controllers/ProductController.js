import { ProductService } from "../services/ProductService.js";

export class ProductController {
	#productService = new ProductService();

	getProducts = async (req, res) => {
		try {
			const response = await this.#productService.getProducts();
			res.status(200).json(response);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	getProductById = async (req, res) => {
		try {
			const { id } = req.params;
			const response = await this.#productService.getProductById(id);
			res.status(200).json(response);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	getProductsBySize = async (req, res) => {
		try {
			const { size } = req.params;
			const response = await this.#productService.getProductsBySize(size);
			res.status(200).json(response);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	getProductByModels = async (req, res) => {
		try {
			const { modelsIds } = req.body
			const response = await this.#productService.getProductsByModels(modelsIds);
			res.status(200).json(response);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	getProductByBrands = async (req, res) => {
		try {
			const { brandsIds } = req.body;
			const response = await this.#productService.getProductsByBrands(brandsIds);
			res.status(200).json(response);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	getProductByCategory = async (req, res) => {
		try {
			const { categoryId } = req.params
			const response = await this.#productService.getProductsByCategory(categoryId);
			res.status(200).json(response);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	updateProductName = async (req, res) => {
		try {
			const { id } = req.params;
			const product = req.body;
			await this.#productService.updateProduct(id, product);
			res.status(200).json(`Product with id: <${id}> updated successfully`);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	addCategoryToProduct = async (req, res) => {
		try {
			const { id } = req.params;
			const { categoryId } = req.body;
			await this.#productService.addCategoryToProduct(id, categoryId);
			res.status(200).json(`Category added successfully`);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	addBrandToProduct = async (req, res) => {
		try {
			const { id } = req.params;
			const { brandId } = req.body;
			await this.#productService.addBrandToProduct(id, brandId);
			res.status(200).json(`Brand added successfully`);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	addModelToProduct = async (req, res) => {
		try {
			const { id } = req.params;
			const { modelId } = req.body;
			await this.#productService.addModelToProduct(id, modelId);
			res.status(200).json(`Brand added successfully`);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	deleteCategoryFromProduct = async (req, res) => {
		try {
			const { id } = req.params;
			const { categoryId } = req.body;
			await this.#productService.deleteCategoryFromProduct(id, categoryId);
			res.status(200).json(`Category deleted successfully`);
		} catch (error) {
			res.status(400).json(error.message);
		}
	}
}