import { Document, Model, Types } from "mongoose";

interface IWallet {
	balance: number;
	userId: Types.ObjectId;
}

interface IWalletDocument extends IWallet, Document {}

interface IWalletModel extends Model<IWalletDocument> {}

export { IWallet, IWalletDocument, IWalletModel };
