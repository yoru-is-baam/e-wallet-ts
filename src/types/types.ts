enum ErrorType {
	TOKEN_EXPIRED_ERROR = "TokenExpiredError",
	TOKEN_VALUE_ERROR = "TokenValueError",
	VALIDATION_ERROR = "ValidationError",
	VALUE_ERROR = "ValueError"
}

enum ResponseStatus {
	ERROR = "error",
	FAIL = "fail",
	SUCCESS = "success"
}

enum Pattern {
	NUMERICAL = "0123456789",
	COMBINATION = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
}

type InputNameAttribute =
	| "email"
	| "username"
	| "password"
	| "oldPassword"
	| "newPassword"
	| "changePassword"
	| "confirmPassword"
	| "resetPassword"
	| "otp"
	| "name"
	| "phone"
	| "birth"
	| "address"
	| "idFront"
	| "idBack";

enum Token {
	ACCESS_TOKEN = "accessToken",
	REFRESH_TOKEN = "refreshToken"
}

export { ErrorType, ResponseStatus, Pattern, InputNameAttribute, Token };
