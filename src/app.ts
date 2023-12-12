import morgan from "morgan";
import "express-async-errors";
import cookieParser from "cookie-parser";
import logger from "./configs/logger.js";
import { env } from "./configs/config.js";

import express, { Request, Response, Express, NextFunction } from "express";
const app: Express = express();

import router from "./routes/index.js";

// error handler
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser(env.cookie.secret));

app.use((req: Request, res: Response, next: NextFunction): void => {
	req.rootPath = process.cwd(); // __dirname is current folder
	next();
});

app.use("/api", router);

// log internal errors
app.use(logger);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
