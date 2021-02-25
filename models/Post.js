const db = require("../db");
const partialUpdate = require('../helpers/partialUpdate.js')
const Tag = require('./Tag')

class Post {
    static async create(data){
        const result = await db.query(
            `INSERT INTO post (title, content, author, locale)
            VALUES ($1, $2, $3, $4) RETURNING id, title, content, author, locale, created_at`, [data.title, data.content, data.author, data.locale])
        
        let post = result.rows[0]

        if (data.tags){
            for (let tag of data.tags){
                await Tag.create(tag)
                await Tag.tagPost(tag, post.id)
            }
            post = {...post, tags: data.tags}
        }

        return post  
    }

    /** Find all applications (can filter on terms in data) */
    static async findAll(data) {
        let baseQuery = `SELECT * FROM post`
        let whereExpressions = []
        let queryValues = []

        if (data.locale) {
            queryValues.push(data.locale)
            whereExpressions.push(`locale = $${queryValues.length}`)
        }

        if (data.title) {
            queryValues.push(data.title)
            whereExpressions.push(`title LIKE $${queryValues.length}`)
        }

        if (whereExpressions.length > 0) {
            baseQuery += " WHERE ";
        }

        let finalQuery = baseQuery + whereExpressions.join('AND') + ' ORDER BY created_at'
        const applicationsRes = await db.query(finalQuery, queryValues)
        return applicationsRes.rows
    }

    /** Find one post by its ID */
    static async findOne(id){
        const postRes = await db.query(`
        SELECT * FROM post WHERE id = $1`, [id])
        let post = postRes.rows[0]

        const tagsRes = await db.query(`SELECT tag FROM post_tag WHERE post_id = $1`, [id])
        let tags = tagsRes.rows.map(tag=>tag.tag)

        if (post){
            post.tags = tags
            return post
        } else {
            return {message: "No records found"}
        }
    }

    /** Update a post */
    static async update(data, id){
        console.log(partialUpdate);
        const {query, values} = partialUpdate("post", data, "id", id)
        const updateRes = await db.query(query, values);

        return updateRes.rows[0]
    }

    /** Delete a post by its ID */
    static async delete(id){
        const postRes = await db.query(`
        DELETE FROM post where id = $1 RETURNING *`, [id])

        return postRes.rows;
    }
}

module.exports = Post;