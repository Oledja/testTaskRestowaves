import { ProductRepository } from "../repositories/ProductRepository.js";
import { CategoryService } from "./CategoryService.js";
import { BrandService } from "./BrandService.js"
import { ModelService } from "./ModelService.js";

export class ProductService {
	#productRepository = new ProductRepository();
	#categoryServce = new CategoryService();
	#brandService = new BrandService();
	#modelService = new ModelService();

	getProducts = async () => {
		try {
			return await this.#productRepository.getProducts();	
		} catch (error) {
			throw error;
		}
	}

	getProductById = async (id) => {
		try {
			const product = await this.#productRepository.getProductById(id);

			if (!product) {
				throw new Error(`Product with id <${id}> doesn't exists`)
			}

			return product;
		} catch (error) {
			throw error;
		}
	}

	getProductsBySize = async (size) => {
		try {
			const products = await this.getProducts();
			const result = products.filter(product => product.sizes.includes(Number(size)));
			return result;
		} catch (error) {
			throw error;
		}
	}

	getProductsByBrands = async (brandsIds) => {
		try {
			brandsIds = brandsIds.map(brendId => {
				return { id: brendId };
			})
			return await this.#productRepository.getProductsByBrands(brandsIds);
		} catch (error) {
			throw error;
		}
	}

	getProductsByModels = async (modelsIds) => {
		try {
			modelsIds = modelsIds.map(modelId => {
				return { id: modelId };
			})
			return await this.#productRepository.getProductsByModels(modelsIds);
		} catch (error) {
			throw error;
		}
	}


	//Search by selected category and all subcategories of this category
	getProductsByCategory = async (categoryId) => {
		try {
			const subCategories = await this.#categoryServce.getSubCategories(categoryId);
			const categoriesIds = subCategories.map(category => {
				 return {id: category.id}
			});
			categoriesIds.push({ id: categoryId })
			return await this.#productRepository.getProductsByCategory(categoriesIds);
		} catch (error) {
			throw error;
		}
	}



	getProductByModelAndCode = async (model, code) => {
		try {
			const product = await this.#productRepository.getProductByModelAndCode(model, code);
			return product ? product : null;
		} catch (error) {
			throw error;
		}
	}

	createProduct = async (product) => {
		try {
			await this.#productRepository.createProduct(product);
		} catch (error) {
			throw error;
		}
	}

	addCategoryToProduct = async (productId, categoryId) => {
		try {
			const product = await this.getProductById(productId);
			const category = await this.#categoryServce.getCategoryById(categoryId);
			product.categories.push(category);
			await this.#productRepository.createProduct(product);
		} catch (error) {
			throw error;
		}
	}

	addBrandToProduct = async (productId, brandId) => {
		try {
			const product = await this.getProductById(productId);
			const brand = await this.#brandService.getBrandById(brandId);
			product.brand = brand;
			await this.#productRepository.createProduct(product);
		} catch (error) {
			throw error;
		}
	}

	addModelToProduct = async (productId, modelId) => {
		try {
			const product = await this.getProductById(productId);
			const brand = await this.#modelService.getModelById(modelId);
			product.brand = brand;
			await this.#productRepository.createProduct(product)
		} catch (error) {
			throw error;
		}
	}

	deleteCategoryFromProduct = async (productId, categoryId) => {
		try {
			const product = await this.getProductById(productId);
			product.categories = product.categories.filter(category => category.id !== categoryId);
			await this.#productRepository.createProduct(product);
		} catch (error) {
			throw error;
		}
	}

	updateProduct = async (id, product) => {
		try {
			const { name } = product;
			
			if (!name) {
				throw new Error("You can only update the name of the product");
			}

			await this.#productRepository.updateProduct(id, product)
		} catch (error) {
			throw error;
		}
	}

	
}