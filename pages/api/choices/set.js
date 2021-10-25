const db = require('better-sqlite3')(process.env.DATABASE_URL);

export default async function handle(req, res) {
    const {userId, questionId, choice} = req.body;

    db
        .prepare('INSERT OR IGNORE INTO choice (question_id, user_id, choice ) VALUES (?, ?, ?)')
        .run(questionId, userId, choice);

    db
        .prepare('UPDATE choice SET choice = ? WHERE user_id = ? AND question_id = ?')
        .run(choice, userId, questionId);

    let choices = db.prepare('SELECT * FROM choice WHERE user_id = ?').all(userId);

    // Remove all permissions on choice change
    db
        .prepare('DELETE FROM match_permission WHERE allow_match_with = ?')
        .run(userId);

    res.json(choices);
}
