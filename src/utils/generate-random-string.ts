import { UserField } from "../types/user.js";
import { Pattern } from "../types/types.js";
import { userService } from "../services/index.js";

function generateRandomString(pattern: Pattern, length: number): string {
	let randomString: string = "";

	for (let i: number = 0; i < length; i++) {
		randomString += pattern[Math.floor(Math.random() * pattern.length)];
	}

	return randomString;
}

export { generateRandomString };
