import { DataSource } from "typeorm";
import { database, host, port, username, password } from "./constants.js";
import { Brand } from "../entities/Brand.js";
import { Category } from "../entities/Category.js";
import { Model } from "../entities/Model.js";
import { Product } from "../entities/Product.js";

export const dataSource = new DataSource({
    type: "postgres",
    database,
    host,
    port,
    username,
    password,
    entities: [Brand, Category, Model, Product],
});
