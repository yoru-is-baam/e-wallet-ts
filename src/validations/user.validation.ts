import Joi, { ObjectSchema, StringSchema } from "joi";
import validationMiddleware from "../middleware/validation.js";
import { InputNameAttribute } from "../types/types.js";

const changePasswordSchema: ObjectSchema<Record<InputNameAttribute, StringSchema<string>>> = Joi.object({
	oldPassword: Joi.string().required().min(6).trim().strict(),
	newPassword: Joi.string().required().min(6).trim().strict(),
	confirmPassword: Joi.string().required().trim().strict().valid(Joi.ref("newPassword"))
});

const resetPasswordPostSchema: ObjectSchema<Record<InputNameAttribute, StringSchema<string>>> = Joi.object({
	email: Joi.string().required().email().trim().strict(),
	phone: Joi.string()
		.required()
		.trim()
		.strict()
		.regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/)
		.message("phone number must be a valid number")
});

const otpSchema: ObjectSchema<Record<InputNameAttribute, StringSchema<string>>> = Joi.object({
	otp: Joi.string().required().min(6).trim().strict()
});

const resetPasswordPatchSchema: ObjectSchema<Record<InputNameAttribute, StringSchema<string>>> = Joi.object({
	newPassword: Joi.string().required().min(6).trim().strict()
});

export default {
	changePasswordValidationMiddleware: validationMiddleware(changePasswordSchema),
	resetPasswordPostValidationMiddleware: validationMiddleware(resetPasswordPostSchema),
	otpValidationMiddleware: validationMiddleware(otpSchema),
	resetPasswordPatchValidationMiddleware: validationMiddleware(resetPasswordPatchSchema)
};
