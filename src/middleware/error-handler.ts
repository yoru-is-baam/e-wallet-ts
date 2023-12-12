import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors/index.js";
import { Error as MongooseError } from "mongoose";
import { ResponseStatus, ErrorType, InputNameAttribute } from "../types/types.js";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const errorHandlerMiddleware: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	let { message }: { message: string } = err;

	if (err instanceof MongooseError.CastError) {
		message = `Can not find with id: ${err.value}`;
		return res.status(StatusCodes.NOT_FOUND).json({
			status: ResponseStatus.FAIL,
			data: {
				errorType: ErrorType.VALUE_ERROR,
				message
			}
		});
	}

	if (err instanceof CustomError) {
		const {
			errorType,
			statusCode,
			fields
		}: { errorType: ErrorType; statusCode: StatusCodes; fields?: Record<InputNameAttribute, string> } = err;

		return res.status(statusCode).json({
			status: ResponseStatus.FAIL,
			data: {
				errorType,
				fields,
				message
			}
		});
	}

	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		status: ResponseStatus.ERROR,
		message: "Something went wrong try again later"
	});
};

export default errorHandlerMiddleware;
