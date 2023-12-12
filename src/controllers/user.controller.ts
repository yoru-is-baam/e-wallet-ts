import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const getUsers = async (req: Request, res: Response): Promise<void> => {
	res.status(StatusCodes.OK).json({ msg: "Ok" });
};

export default {
	getUsers
};
