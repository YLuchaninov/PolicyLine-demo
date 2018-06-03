import Jwt from "jsonwebtoken";

export default function verifyJWT(token, key) {
    return new Promise((resolve, reject) => {
        Jwt.verify(token, key, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}