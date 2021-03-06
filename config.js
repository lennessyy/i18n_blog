/** Shared config for application; can be req'd many places. */

require('dotenv').config()

const SECRET = process.env.SECRET_KEY || 'test';

const PORT = +process.env.PORT || 3001;

// database is:
//
// - on Heroku, get from env var DATABASE_URL
// - in testing, 'mscams-test'
// - else: 'mscams'

let DB_URI

if (process.env.NODE_ENV === "test") {
    DB_URI = "i18n_blog_test";
} else {
    DB_URI = process.env.DATABASE_URL || 'i18n_blog';
}

console.log("Using database", DB_URI);

module.exports = {
    SECRET,
    PORT,
    DB_URI,
};