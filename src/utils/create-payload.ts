import { HydratedDocument } from "mongoose";
import { IUserDocument, UserPayload } from "../types/user.js";
import { Role, UserStatus } from "../types/types.js";

const createPayload = (user: HydratedDocument<IUserDocument>): UserPayload => {
	return {
		name: user.profile.name,
		userId: user._id,
		status: user.status as UserStatus,
		role: user.role as Role
	};
};

export default createPayload;
