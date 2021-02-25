const db = require('../db')

class Tag{
    // create a new tag if tag doesn't exist
    static async create(name){
        // check for duplicate
        const result = await db.query(`
        SELECT * FROM tag WHERE name = $1`, [name])

        if (result.rows.length === 0){
            const newTag = await db.query(`INSERT INTO tag (name) VALUES ($1) RETURNING *`, [name])
            return true
        } else {
            return false
        }
    }

    // delete a tag
    static async delete(name){
        const result = await db.query(`
        DELETE FROM tag WHERE name = $1 RETURNING *`, [name])

        if (result.rows.length > 0){
            return true
        } else {
            return false
        }
    } 

    // associate a tag with a post
    static async tagPost(name, postId){
        // check for duplicate
        const duplicate = await db.query(`SELECT * FROM post_tag WHERE post_id = $1 AND tag = $2`, [postId, name])

        if (duplicate.rows.length > 0){
            return false
        }

        const result = await db.query(`
        INSERT INTO post_tag (post_id, tag) VALUES ($1, $2) RETURNING *`, [postId, name])

        return true
    }

}

module.exports = Tag;