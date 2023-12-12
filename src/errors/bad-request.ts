import { StatusCodes } from "http-status-codes";
import { ErrorType, InputNameAttribute } from "../types/types.js";
import CustomError from "./custom-error.js";

class BadRequestError extends CustomError {
	public errorType: ErrorType;
	public statusCode: StatusCodes;
	public fields?: Record<InputNameAttribute, string>;

	constructor(message: string, errorType: ErrorType, fields?: Record<InputNameAttribute, string>) {
		super(message);
		this.errorType = errorType;
		this.fields = fields;
		this.statusCode = StatusCodes.BAD_REQUEST;
	}
}

export default BadRequestError;
