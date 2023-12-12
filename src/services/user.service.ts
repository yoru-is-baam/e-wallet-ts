import { User } from "../models/index.js";
import { HydratedDocument } from "mongoose";
import { BadRequestError } from "../errors/index.js";
import { generateRandomString } from "../utils/index.js";
import { IProfile, IUserDocument, UserField } from "../types/user.js";
import { ErrorType, InputNameAttribute, Pattern } from "../types/types.js";

const createUser = async (profile: IProfile): Promise<HydratedDocument<IUserDocument>> => {
	let isFieldTaken: boolean = await checkFieldExistence({ "profile.email": profile.email } as Record<
		UserField,
		string
	>);

	if (isFieldTaken) {
		throw new BadRequestError("Wrong validation", ErrorType.VALIDATION_ERROR, {
			email: "Email already exists"
		} as Record<InputNameAttribute, string>);
	}

	isFieldTaken = await checkFieldExistence({ "profile.phone": profile.phone } as Record<UserField, string>);

	if (isFieldTaken) {
		throw new BadRequestError("Wrong validation", ErrorType.VALIDATION_ERROR, {
			phone: "Phone number already exists"
		} as Record<InputNameAttribute, string>);
	}

	// create user account
	const username = await generateUsername();
	const password = generateRandomString(Pattern.COMBINATION, 6);

	return User.create({
		username,
		password,
		profile
	});
};

const checkFieldExistence = async (field: Record<UserField, string>, excludeUserId?: string): Promise<boolean> => {
	const isFieldTaken: boolean = await User.isFieldTaken(field, excludeUserId);
	return isFieldTaken;
};

const generateUsername = async (): Promise<string> => {
	let username: string = "";
	let isExisted: boolean = false;

	do {
		username = generateRandomString(Pattern.NUMERICAL, 10);
		isExisted = await User.isFieldTaken({ username } as Record<UserField, string>);
	} while (isExisted);

	return username;
};

export default { createUser, checkFieldExistence };
