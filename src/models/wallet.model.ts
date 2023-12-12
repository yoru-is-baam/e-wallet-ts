import { Schema, model } from "mongoose";
import { IWalletDocument, IWalletModel } from "../types/wallet.js";

const walletSchema = new Schema<IWalletDocument>({
	balance: {
		type: Number,
		required: true,
		default: 0
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
		unique: true
	}
});

const Wallet: IWalletModel = model<IWalletDocument, IWalletModel>("wallets", walletSchema);

export default Wallet;
