import { GoogleSheetsService } from "./GoogleSheetsService.js";
import { ProductService } from "./ProductService.js";
import { ModelService } from "./ModelService.js";
import * as dotenv from "dotenv";

dotenv.config();

const credentials = process.env.GOOGLE_CREDENTIALS_FILE_PATH;
const spreadsheetId = process.env.GOOGLE_SPREAD_SHEET_ID;

export class SchedulerService {
	#googleSheetsService = new GoogleSheetsService(credentials, spreadsheetId);
	#productService = new ProductService();
	#modelService = new ModelService();
	saveNewProductsOrUpdateSizes = async () => {
		try {
			// getting all models from a table 
			const sheets = await this.#googleSheetsService.getSheets();

			for (const sheet of sheets) {
				// checking if the model already exists
				let currentModel = await this.#modelService.getModelByName(sheet);

				if (!currentModel) {
					currentModel = await this.#modelService.createModel({ name: sheet })
				}
				// all products from model
				const products = await this.#getProductsFromSheet(sheet);
				//updating product sizes if necessary, or creating new products if they don't exist.
				for (let i = 0; i < products.length; i++) {
					const { name, code, price, sizes } = products[i];
					const model = currentModel;

					//check the product in the database
					const candidate = await this.#productService.getProductByModelAndCode(model, code);

					if (!candidate) {
						//create if doesn't exists
						await this.#productService.createProduct({
							name,
							code,
							price,
							sizes,
							model
						});
						continue;
					}

					if (candidate.sizes !== sizes) {
						//update if necessary
						candidate.sizes = sizes;
						await this.#productService.updateProduct(candidate.id, candidate);
					}
				}
			}
		} catch (error) {
			console.log(error);
		}
	}

	#getProductsFromSheet = async (sheet) => {

		const productNames = new Map();
		const productSizes = new Map();
		let pricesIndexInRawData;
		let codesIndexInRawData;

		try {
			const rawData = await this.#googleSheetsService.getRows(sheet);
			//find the indexes of all the rows that I need by names
			for (let i = 0; i < rawData.length; i++) {
				let currentField = rawData[i][0].replace(/\s/g, '').toLowerCase();
				if (currentField === "імя") {
					
					//find all product names and their indexes
					// loop starts at 1 because 0 is the row name
					for (let y = 1; y < rawData[i].length; y++) {
						productNames.set(y, rawData[i][y]);
					}
				}
				//find all sizes rows
				if (Number(currentField)) {
					productSizes.set(i, Number(currentField))
				}
				//code row
				if (currentField === "кодтовару") {
					codesIndexInRawData = i;
				}
				// price row
				if (currentField === "ціна") {
					pricesIndexInRawData = i
				}
			}
			//collect products by their indexes in rows
			const products = [];
			
			for (const [productIndex, productName] of productNames.entries()) {
				const name = productName;
				const code = rawData[codesIndexInRawData][productIndex];
				const price = rawData[pricesIndexInRawData][productIndex];
				const sizes = [];

				for ( const [key, value] of productSizes.entries()) {
					if (rawData[key][productIndex]) {
						sizes.push(value)
					}
				}
				
				products.push({
					name,
					code,
					price,
					sizes
				})
			}
			return products;
		} catch (error) {
			throw error;
		}
	}

}


