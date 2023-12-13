import { HydratedDocument } from "mongoose";
import { IUserDocument, UserPayload, Role, Status } from "../types/user.js";

const createPayload = (user: HydratedDocument<IUserDocument>): UserPayload => {
	return {
		name: user.profile.name,
		userId: user._id,
		status: user.status as Status,
		role: user.role as Role
	};
};

export default createPayload;
