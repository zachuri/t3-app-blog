import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET || "changeme";

export function singJwt(data: object) {
	return jwt.sign(data, SECRET);
}

// need an explanation
export function verifyJwt<T>(token: string) {
	return jwt.verify(token, SECRET) as T;
}
