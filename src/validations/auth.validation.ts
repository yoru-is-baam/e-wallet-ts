import Joi, { ObjectSchema, StringSchema } from "joi";
import validationMiddleware from "../middleware/validation.js";
import { InputNameAttribute } from "../types/types.js";

const registerSchema: ObjectSchema<Record<InputNameAttribute, StringSchema<string>>> = Joi.object({
	email: Joi.string().required().email().trim().strict(),
	phone: Joi.string()
		.required()
		.trim()
		.strict()
		.regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/)
		.message("phone number must be a valid number"),
	name: Joi.string().required().trim().strict(),
	birth: Joi.date().required(),
	address: Joi.string().required().trim().strict()
});

const loginSchema: ObjectSchema<Record<InputNameAttribute, StringSchema<string>>> = Joi.object({
	username: Joi.string()
		.required()
		.min(10)
		.trim()
		.strict()
		.error((errors) => {
			errors.forEach((err) => {
				switch (err.code) {
					case "string.min":
						err.message = "username is invalid";
						break;
					default:
						break;
				}
			});
			return errors;
		}),
	password: Joi.string()
		.required()
		.min(6)
		.trim()
		.strict()
		.error((errors) => {
			errors.forEach((err) => {
				switch (err.code) {
					case "string.min":
						err.message = "password is invalid";
						break;
					default:
						break;
				}
			});
			return errors;
		})
});

export default {
	registerValidationMiddleware: validationMiddleware(registerSchema),
	loginValidationMiddleware: validationMiddleware(loginSchema)
};
