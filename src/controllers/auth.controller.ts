import { Request, Response } from "express";

const register = async (req: Request, res: Response): Promise<void> => {
	res.json({ msg: "Ok" });
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
