import { SchedulerService } from "../services/SchedulerService.js";
import cron from "node-cron";

export const databaseUpdateScheduler = async () => {
	const schedulerService = new SchedulerService();
	await schedulerService.saveNewProductsOrUpdateSizes();
	try {
		cron.schedule("0 * * * *", async () => {
			console.log("DB is updating")

			await schedulerService.saveNewProductsOrUpdateSizes();

			console.log("DB was updated successfully")
		})
	} catch (error) {
		console.log(error);
	}
}