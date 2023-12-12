export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			MONGODB_URI: string;
			PORT: number;
			SMTP_HOST: string;
			SMTP_PORT: number;
			SMTP_USERNAME: string;
			SMTP_PASSWORD: string;
			EMAIL_FROM: string;
			COOKIE_SECRET: string;
			ACCESS_TOKEN_SECRET: string;
			ACCESS_TOKEN_LIFETIME: string;
			REFRESH_TOKEN_SECRET: string;
			REFRESH_TOKEN_LIFETIME: string;
			CLOUD_NAME: string;
			CLOUD_API_KEY: string;
			CLOUD_API_SECRET: string;
		}
	}
	namespace Express {
		interface Request {
			rootPath?: string;
		}
	}
}
