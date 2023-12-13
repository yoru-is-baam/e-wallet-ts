import { User } from "../models/index.js";
import { HydratedDocument } from "mongoose";
import { IUserDocument, IProfile, Role, Status } from "../types/user.js";
import { env } from "../configs/config.js";

const createAdminAccount = async (): Promise<void> => {
	const user: HydratedDocument<IUserDocument> | null = await User.findOne({ username: "administrator" });

	if (user === null) {
		const profile: IProfile = {
			name: "admin",
			email: env.email.from,
			idPath: {
				idFront: null,
				idBack: null
			},
			phone: "0111222333",
			address: "Vietnam",
			birth: "01/01/2002"
		};

		await User.create({
			username: "administrator",
			password: "123456",
			status: Status.VERIFIED,
			role: Role.ADMIN,
			profile,
			otp: "000000"
		});
	}
};

export default createAdminAccount;
