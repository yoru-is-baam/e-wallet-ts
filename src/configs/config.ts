import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const env = {
	port: process.env.PORT,
	mongoose: {
		uri: process.env.MONGODB_URI
	},
	cloudinary: {
		cloud_name: process.env.CLOUD_NAME,
		api_key: process.env.CLOUD_API_KEY,
		api_secret: process.env.CLOUD_API_SECRET
	},
	cookie: {
		secret: process.env.COOKIE_SECRET
	},
	jwt: {
		accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
		accessTokenLifetime: process.env.ACCESS_TOKEN_LIFETIME,
		refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
		refreshTokenLifetime: process.env.REFRESH_TOKEN_LIFETIME
	},
	email: {
		smtp: {
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT),
			secure: true,
			auth: {
				user: process.env.SMTP_USERNAME,
				pass: process.env.SMTP_PASSWORD
			}
		},
		from: process.env.EMAIL_FROM
	}
};
