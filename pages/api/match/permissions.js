import Cors from 'cors'
import initMiddleware from '../../../lib/init-middleware'
const db = require('better-sqlite3')(process.env.DATABASE_URL);

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET', 'POST', 'OPTIONS'],
    })
)

export default async function handle(req, res) {
    await cors(req, res);

    const {id} = req.body;

    const permissions = await fetchPermissions(id);

    res.json(permissions);
}

export async function fetchPermissions(id) {
    let permissions = db
        .prepare('SELECT id, username, is_allowed.allow_match_with as isAllowed, has_given_permission.user_id AS hasGivenPermission ' +
            'FROM user ' +
            'LEFT JOIN match_permission AS is_allowed ON is_allowed.user_id = ? ' +
            'LEFT JOIN match_permission AS has_given_permission ON has_given_permission.allow_match_with = ? ' +
            'WHERE id <> ?'
        )
        .all(id, id, id);

    return permissions.map(({id, username, isAllowed, hasGivenPermission}) => ({
        id,
        username,
        isAllowed: !!isAllowed,
        hasGivenPermission: !!hasGivenPermission
    }));
}
