import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { generateRandomString } from "../utils/generate-random-string.js";
import { Pattern, Role, UserStatus } from "../types/types.js";
import { IUserDocument, IUserModel, UserField } from "../types/user.js";

const userSchema = new Schema<IUserDocument>(
	{
		username: {
			type: String,
			required: true,
			min: 10,
			unique: true
		},
		password: {
			type: String,
			required: true,
			min: 6
		},
		status: {
			type: String,
			required: true,
			enum: ["pending", "verified", "disabled", "updating"],
			default: UserStatus.PENDING
		},
		wrongCount: {
			type: Number,
			required: true,
			max: 6,
			default: 0
		},
		unusualLogin: {
			type: Boolean,
			required: true,
			default: false
		},
		blockedTime: {
			type: Date,
			required: true,
			default: new Date(0)
		},
		role: {
			type: String,
			required: true,
			enums: ["admin", "user"],
			default: Role.USER
		},
		profile: {
			phone: {
				type: String,
				unique: true,
				required: true
			},
			email: {
				type: String,
				unique: true,
				required: true
			},
			name: {
				type: String,
				required: true
			},
			birth: {
				type: String,
				required: true
			},
			address: {
				type: String,
				required: true
			},
			idPath: {
				idFront: {
					type: String,
					default: null
				},
				idBack: {
					type: String,
					default: null
				}
			}
		},
		otp: {
			type: String,
			required: true,
			default: generateRandomString(Pattern.NUMERICAL, 6)
		},
		refreshToken: {
			type: String,
			default: null
		}
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (this: IUserDocument, next: (err?: Error) => void): Promise<void> {
	if (!this.isModified("password")) return;
	const salt: string = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

userSchema.method("comparePassword", async function (password: string): Promise<boolean> {
	const isMatch: boolean = await bcrypt.compare(password, this.password);
	return isMatch;
});

userSchema.method("updateWrongCount", async function (): Promise<void> {
	const FIRST_WRONG_LIMIT: number = 3;
	++this.wrongCount;

	if (this.wrongCount === FIRST_WRONG_LIMIT) {
		this.unusualLogin = true;
		this.blockedTime = new Date(Date.now());
	}

	await this.save();
});

userSchema.method("restoreLoginStatus", async function (): Promise<void> {
	this.wrongCount = 0;
	this.unusualLogin = false;
	this.blockedTime = new Date(0);

	await this.save();
});

userSchema.static(
	"isFieldTaken",
	async function (field: Record<UserField, string>, excludeUserId?: string): Promise<boolean> {
		const [key, value]: [string, string] = Object.entries(field)[0];
		const isTaken: string | null = await this.exists({ [key]: value, _id: { $ne: excludeUserId } });

		return !!isTaken;
	}
);

const User: IUserModel = model<IUserDocument, IUserModel>("users", userSchema);

export default User;
