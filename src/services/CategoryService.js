import { CategoryRepository } from "../repositories/CategoryRepository.js"

export class CategoryService {
	#categoryRepository = new CategoryRepository();

	getCategories = async () => {
		try {
			return await this.#categoryRepository.getCategories();
		} catch (error) {
			throw error;
		}
	}

	getCategoryById = async (id) => {
		try {
			const category = await this.#categoryRepository.getCategoryById(id);

			if (!category) {
				throw new Error(`Category with id <${id}> doesn't exists`);
			}

			return category;
		} catch (error) {
			throw error;
		}
	}

	createCategory = async (category) => {
		try {
			const { name } = category;
			const candidate = await this.#categoryRepository.getCategoryByName(name);

			if (candidate) {
				throw new Error(`Category with name <${name}> already exists`);
			}

			return await this.#categoryRepository.createCategory(category);
		} catch (error) {
			throw error;
		}	
	}

	createSubCategory = async (categoryId, subCategory) => {
		try {
			const parentCategory = await this.getCategoryById(categoryId);

			if (!parentCategory) {
				throw new Error(`Parent category with id <${id}> doesn't exists`);
			}

			return await this.#categoryRepository.createCategory({...subCategory, parentCategory});
		} catch (error) {
			throw error;
		}	
	}

	updateCategory = async (id, category) => {
		try {
			const { name } = category;
			if (!name) {
				throw new Error("You can only update the name of the product");
			}
			await this.#categoryRepository.updateCategory(id, { name });
		} catch (error) {
			throw error;
		}
	}

	deleteCategory = async (id) => {
		try {
			await this.#categoryRepository.deleteCategory(id);
		} catch (error) {
			throw error
		}
	}

	getSubCategories = async (id) => {
		try {
			const result = [];
			const category = await this.#categoryRepository.getCategoryById(id);
			const subCategories = await this.#categoryRepository.getSubCategories(category.id);

			if (!subCategories) {
				return result;
			} else {
				result.push(...subCategories);
			}
			
			return await this.#getSubCategoriesRecursively(subCategories, result);
		} catch (error) {
			throw error;
		}
	}

	#getSubCategoriesRecursively = async (subCategories, categoriesArray) => {
		try {
			for (let i = 0; i < subCategories.length; i++) {
				const result = await this.#categoryRepository.getSubCategories(subCategories[i].id);
				if (result) {
					categoriesArray.push(...result);
					await this.#getSubCategoriesRecursively(result, categoriesArray);
				}
			}
			return categoriesArray;
		} catch (error) {
			throw error;
		}
	}
}