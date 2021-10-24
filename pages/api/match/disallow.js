import {fetchPermissions} from "./permissions";

const db = require('better-sqlite3')(process.env.DATABASE_URL);

export default async function handle(req, res) {
    const {userId, disallowMatchWith} = req.body;

    db
        .prepare('DELETE FROM match_permission WHERE user_id = ? AND allow_match_with = ?')
        .run(userId, disallowMatchWith);

    let permissions = await fetchPermissions(userId);

    res.json(permissions);
}
