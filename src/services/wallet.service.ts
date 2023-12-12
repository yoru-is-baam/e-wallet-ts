import { HydratedDocument } from "mongoose";
import { Wallet } from "../models/index.js";
import { IWalletDocument } from "../types/wallet.js";

const createWallet = async (userId: string): Promise<HydratedDocument<IWalletDocument>> => {
	return Wallet.create({ userId });
};

const getWalletByUserId = async (userId: string): Promise<HydratedDocument<IWalletDocument> | null> => {
	return Wallet.findOne({ userId });
};

export default {
	createWallet,
	getWalletByUserId
};
