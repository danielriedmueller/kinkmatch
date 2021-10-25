const db = require('better-sqlite3')(process.env.DATABASE_URL);

export default async function handle(req, res) {
    const {userId} = req.body;

    db
        .prepare('DELETE FROM choice WHERE user_id = ?').run(userId);

    // Remove all permissions on choice change
    db
        .prepare('DELETE FROM match_permission WHERE allow_match_with = ?')
        .run(userId);

    res.json([]);
}
