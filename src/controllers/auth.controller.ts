import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import { IUserDocument, UserPayload } from "../types/user.js";
import { mailService, userService, walletService } from "../services/index.js";
import { StatusCodes } from "http-status-codes";
import { ResponseStatus } from "../types/types.js";
import { Jwt, createPayload } from "../utils/index.js";
import { env } from "../configs/config.js";

const register = async (req: Request, res: Response): Promise<void> => {
	const user: HydratedDocument<IUserDocument> = await userService.createUser(req.body);
	await walletService.createWallet(user._id);

	// send mail
	// mailService.sendEmail(
	// 	user.profile.email,
	// 	"Your account ✔",
	// 	`<p>Username: ${user.username}</p><p>Password: ${user.password}</p>`
	// );

	// jwt & cookies
	const payload: UserPayload = createPayload(user);
	const accessToken: Jwt = new Jwt(env.jwt.accessTokenSecret, env.jwt.accessTokenLifetime);

	res.status(StatusCodes.CREATED).json({ status: ResponseStatus.SUCCESS, data: { user } });
};

const login = async (req: Request, res: Response): Promise<void> => {
	res.json({ msg: "Ok" });
};

const logout = async (req: Request, res: Response): Promise<void> => {
	res.json({ msg: "Ok" });
};

const refreshToken = async (req: Request, res: Response): Promise<void> => {
	res.json({ msg: "Ok" });
};

export default {
	register,
	login,
	logout,
	refreshToken
};
