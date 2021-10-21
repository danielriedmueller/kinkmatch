const db = require('better-sqlite3')(process.env.DATABASE_URL);

export default async function handle(req, res) {
    const {id} = req.body;
    let choices = db.prepare('SELECT * FROM choice WHERE user_id = ?').all(id);

    res.json(choices);
}
