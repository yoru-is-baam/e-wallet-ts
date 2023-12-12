import { Document, Model } from "mongoose";

type UserField = "username" | "profile.email" | "profile.phone" | "profile.birth" | "profile.address" | "profile.name";

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
}

interface IUserDocument extends IUser, Document {
	comparePassword(password: string): Promise<boolean>;
	updateWrongCount(): Promise<void>;
	restoreLoginStatus(): Promise<void>;
}

interface IUserModel extends Model<IUserDocument> {
	isFieldTaken(field: Record<UserField, string>, excludeUserId?: string): Promise<boolean>;
}

export { IUser, IProfile, IUserDocument, IUserModel, UserField };
