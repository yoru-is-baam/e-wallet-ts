import app from "./app.js";
import connectDB from "./db/connect.js";
import { env } from "./configs/config.js";
import createAdminAccount from "./db/create-admin-account.js";

const port: number = env.port || 8080;

const startServer = async (): Promise<void> => {
	try {
		await connectDB(env.mongoose.uri);
		await createAdminAccount();
		app.listen(port, (): void => {
			console.log(`Server is listening on port ${port}`);
		});
	} catch (error: unknown) {
		console.log(error);
	}
};

startServer();
