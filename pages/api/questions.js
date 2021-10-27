const db = require('better-sqlite3')(process.env.DATABASE_URL);

export default async function handle(req, res) {
    let questions = db.prepare('SELECT * FROM question ORDER BY text ASC').all();

    res.json(questions);
}
