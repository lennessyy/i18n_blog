const db = require("../db");

class Post {
    static async create(data){
        const result = await db.query(
            `INSERT INTO post (title, content, author, locale, created_at)
            VALUES ($1, $2, $3, $4, $5) RETURNING id, title, content, author, locale, created_at`, [data.title, data.content, data.author, data.locale, +new Date()])
        return result.rows[0]    
    }
}

module.exports = Post;