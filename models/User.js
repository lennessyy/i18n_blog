const db = require("../db");
const bcrypt = require("bcrypt");

const BCRYPT_WORK_FACTOR = 10;

class User{
    static async authenticate(data) {
        // try to find the user first
        const result = await db.query(
            `SELECT username, 
                    password, 
                    first_name, 
                    last_name, 
              FROM "user" 
              WHERE username = $1`,
            [data.username]
        );

        const user = result.rows[0];

        if (user) {
            // compare hashed password to a new hash from password
            const isValid = await bcrypt.compare(data.password, user.password);
            if (isValid) {
                return user;
            }
        }

        const invalidPass = new Error("Invalid Credentials");
        invalidPass.status = 401;
        throw invalidPass;
    }

    /** Register user with data. Returns new user data. */

    static async register(data) {
        const duplicateCheck = await db.query(
            `SELECT username 
            FROM "user" 
            WHERE username = $1`,
            [data.username]
        );

        if (duplicateCheck.rows[0]) {
            const err = new Error(
                `There already exists a user with username '${data.username}`);
            err.status = 409;
            throw err;
        }

        const hashedPassword = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `INSERT INTO "user" 
            (username, password, first_name, last_name) 
          VALUES ($1, $2, $3, $4) 
          RETURNING username, first_name, last_name`,
            [
                data.username,
                hashedPassword,
                data.first_name,
                data.last_name
            ]);

        return result.rows[0];
    }
}

module.exports = User