BRAND:

(get all brands)
GET /brands => RESPONSE [
					{
						"id": "643155f7-beac-464b-9196-e13aa845bbe1",
						"name": "BRANDNAME1"
					},
					{
						"id": "643155f7-beac-464b-9196-e13aa845bbe2",
						"name": "BRANDNAME2"
					}
			   ]


(get brand by id)
GET /brands/:id => RESPONSE {
						"id": "643155f7-beac-464b-9196-e13aa845bbec",
						"name": "BRANDNAME"
					}


(create brand)
POST /brands => REQUEST { "name": "BRANDNAME" }
				RESPONSE {
							"id": "643155f7-beac-464b-9196-e13aa845bbec",
							"name": "BRANDNAME"
						}


(update brand)						
PUT /brands/:id => REQUEST { "name": "NEWBRANDNAME" }
				   RESPONSE {string}


(delete brand)	
DELETE /brands/:id => RESPONSE {string}

MODEL AND CATEGORIES WITH THE SAME FUNCTIONALITY

GET    /models =>  get all models
GET    /models/:id => get model by id
POST   /models" => create model
PUT    /models/:id => update model
DELETE /models/:id => delete model


GET    /categories => get all categories
GET    /categories/:id => get category by id 
POST   /categories => create category
PUT    /categories/:id => update category
DELETE /categories/:id => delete category


(create sub category)
POST /categories/sub/:id<parent category id> => REQUEST { name: "SUBCATEGORYNAME" }
												RESPONSE {
															"id": "20375aae-dd61-423b-b668-3c2a5887883d",
															"name": "SUBCATEGORYNAME",
															"parentCategory": {
																"id": "30730780-0d9f-4275-97f7-9270c93bf734",
																"name": "CATEGORYNAME"
															}
														  }


PRODUCT

(get all products)
GET /products => RESPONSE [
							{
								"id": "8cd8763e-1c53-4b4c-8dbd-51431e40d5a3",
								"name": "Nike Air Jordan Why Not 6 X Black Metallic Gold DO7189-071 1\n",
								"code": "12",
								"price": 4000,
								"sizes": [
									39,
									42,
									44,
									45,
									46
								]
							},
						]


(get product by id)
GET /products/:id => RESPONSE {
								"id": "8cd8763e-1c53-4b4c-8dbd-51431e40d5a3",
								"name": "Nike Air Jordan Why Not 6 X Black Metallic Gold DO7189-071 1\n",
								"code": "12",
								"price": 4000,
								"sizes": [
									39,
									42,
									44,
									45,
									46
								]
							}



GET /products/sizes/:size<number> get products by size 
GET /products/categories/:categoryId get products by category includes all subcategories of current category
POST /products/models/ REQUEST { "modelsIds": ["643155f7-beac-464b-9196-e13aa845bbec"]  } get products by models
POST /products/brands/ REQUEST { "brandsIds": ["643155f7-beac-464b-9196-e13aa845bbec"]  } get products by brands
POST /products/:id<productId>/categories REQUEST { "categoryId": "643155f7-beac-464b-9196-e13aa845bbec" } add category to product
POST /products/:id/brands REQUEST { "brandsId": "643155f7-beac-464b-9196-e13aa845bbec" } add brands to product
POST /products/:id/models REQUEST { "modelsId": "643155f7-beac-464b-9196-e13aa845bbec" } add models to product
POST /products/:id REQUEST { "name": "NEWPRODUCTNAME" } update product name
DELETE /products/:id/categories REQUEST { "categoryId": "643155f7-beac-464b-9196-e13aa845bbec" } delete category from product

Використав TypeOrm та Cron для зручності та швидкості

Дуже поспішав бо такі були умови, розглядають перші вмконані завдання
