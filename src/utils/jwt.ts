import jwt from "jsonwebtoken";
import { UserPayload } from "../types/user.js";

class Jwt {
	private secret: string;
	private lifetime: string;

	constructor(secret: string, lifetime: string) {
		this.secret = secret;
		this.lifetime = lifetime;
	}

	public createToken(payload: UserPayload): string {
		return jwt.sign(payload, this.secret, { expiresIn: this.lifetime });
	}

	public verifyToken(token: string): string | jwt.JwtPayload {
		return jwt.verify(token, this.lifetime);
	}
}

export default Jwt;
