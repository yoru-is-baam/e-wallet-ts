import { connect, Mongoose } from "mongoose";

const connectDB = (uri: string): Promise<Mongoose> => {
	return connect(uri);
};

export default connectDB;
