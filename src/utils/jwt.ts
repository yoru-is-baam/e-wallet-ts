import jwt from "jsonwebtoken";
import { UserPayload } from "../types/user.js";
import { Token } from "../types/types.js";
import { env } from "../configs/config.js";

type TokenStrategy = {
	[Token.ACCESS_TOKEN]: string;
	[Token.REFRESH_TOKEN]: string;
};

const tokenSecretStrategies: TokenStrategy = {
	[Token.ACCESS_TOKEN]: env.jwt.accessTokenSecret,
	[Token.REFRESH_TOKEN]: env.jwt.refreshTokenSecret
};

const tokenLifetimeStrategies: TokenStrategy = {
	[Token.ACCESS_TOKEN]: env.jwt.accessTokenLifetime,
	[Token.REFRESH_TOKEN]: env.jwt.refreshTokenLifetime
};

const getTokenSecret = (token: Token): string => tokenSecretStrategies[token];
const getTokenLifetime = (token: Token): string => tokenLifetimeStrategies[token];

const createJWT = (payload: UserPayload, token: Token): string => {
	const secret: string = getTokenSecret(token);
	const lifetime: string = getTokenLifetime(token);

	return jwt.sign(payload, secret, { expiresIn: lifetime });
};

const verifyToken = (token: Token): string | jwt.JwtPayload => {
	const secret: string = getTokenSecret(token);

	return jwt.verify(token, secret);
};

export { createJWT, verifyToken };
