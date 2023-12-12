import { StatusCodes } from "http-status-codes";
import { ErrorType, InputNameAttribute } from "../types/types.js";

abstract class CustomError extends Error {
	abstract errorType: ErrorType;
	abstract statusCode: StatusCodes;
	abstract fields?: Record<InputNameAttribute, string>;

	constructor(message: string) {
		super(message);

		Object.setPrototypeOf(this, CustomError.prototype);
	}
}

export default CustomError;
