import {fetchPermissions} from "./permissions";

const db = require('better-sqlite3')(process.env.DATABASE_URL);

export default async function handle(req, res) {
    const {userId, allowMatchWith} = req.body;

    db
        .prepare('INSERT OR IGNORE INTO match_permission (user_id, allow_match_with ) VALUES (?, ?)')
        .run(userId, allowMatchWith);

    let permissions = await fetchPermissions(userId);

    res.json(permissions);
}
