import { Document, Model } from "mongoose";

enum Status {
	PENDING = "pending",
	VERIFIED = "verified",
	DISABLED = "disabled",
	UPDATING = "updating"
}

enum Role {
	ADMIN = "admin",
	USER = "user"
}

type UserField = "username" | "profile.email" | "profile.phone" | "profile.birth" | "profile.address" | "profile.name";

type UserPayload = {
	name: string;
	userId: string;
	status: Status;
	role: Role;
};

interface IProfile {
	email: string;
	phone: string;
	name: string;
	birth: string;
	address: string;
	idPath?: {
		idFront: string | null;
		idBack: string | null;
	};
}

interface IUser {
	username: string;
	password: string;
	status: string;
	wrongCount: number;
	unusualLogin: boolean;
	blockedTime: Date;
	role: string;
	profile: IProfile;
	otp: string;
	refreshToken: string;
	_plainPassword: string;
}

interface IUserDocument extends IUser, Document {
	comparePassword(password: string): Promise<boolean>;
	updateWrongCount(): Promise<void>;
	restoreLoginStatus(): Promise<void>;
}

interface IUserModel extends Model<IUserDocument> {
	isFieldTaken(field: Record<UserField, string>, excludeUserId?: string): Promise<boolean>;
}

export { IUser, IProfile, IUserDocument, IUserModel, UserField, UserPayload, Status, Role };
