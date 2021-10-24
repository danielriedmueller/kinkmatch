const db = require('better-sqlite3')(process.env.DATABASE_URL);

export default async function handle(req, res) {
    const {userId, questionId, choice} = req.body;

    let choices = db.prepare('INSERT INTO choice (question_id, user_id, choice ) VALUES (?, ?, ?)')
        .all(questionId, userId, choice);

    res.json(choices);
}
