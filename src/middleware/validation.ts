import { BadRequestError } from "../errors/index.js";
import { ErrorType, InputNameAttribute } from "../types/types.js";
import { Schema, ValidationError, ValidationErrorItem } from "joi";
import { NextFunction, Request, RequestHandler, Response } from "express";

const validationMiddleware =
	(schema: Schema): RequestHandler =>
	(req: Request, res: Response, next: NextFunction): void => {
		const { error }: { error?: ValidationError } = schema.validate(req.body, {
			abortEarly: false,
			errors: { label: "key", wrap: { label: false } }
		});

		if (!error) {
			next();
		} else {
			const fields: Record<InputNameAttribute, string> = error.details.reduce(
				(obj: Record<InputNameAttribute, string>, item: ValidationErrorItem) => {
					obj[item.context?.key as InputNameAttribute] = item.message;
					return obj;
				},
				{} as Record<InputNameAttribute, string>
			);
			throw new BadRequestError("Wrong validation", ErrorType.VALIDATION_ERROR, fields);
		}
	};

export default validationMiddleware;
