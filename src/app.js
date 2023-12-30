import "reflect-metadata";
import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { dataSource } from "./db/connection.js";
import { modelRouter } from "./routes/ModelRouter.js";
import { databaseUpdateScheduler } from "./schedulers/DatabaseUpdateScheduler.js";
import { productRouter } from "./routes/ProductRouter.js";
import { brandRouter } from "./routes/BrandRouter.js";
import { categoryRouter } from "./routes/CategoryRouter.js";

dotenv.config();

const port = process.env.APP_PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    modelRouter, 
    productRouter,
    brandRouter,
    categoryRouter,
);

app.listen(port, async () => {
    await dataSource.initialize();
    // await dataSource.synchronize(true);
    await databaseUpdateScheduler();
    console.log(`Server started on port ${port}`);
});
