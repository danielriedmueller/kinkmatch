const db = require('better-sqlite3')(process.env.DATABASE_URL);

export default async function handle(req, res) {
    const {id} = req.body;

    const permissions = await fetchPermissions(id);

    res.json(permissions);
}

export async function fetchPermissions(id) {
    let permissions = db
        .prepare('SELECT id, username, is_allowed.allow_match_with as isAllowed, has_given_permission.allow_match_with AS hasGivenPermission ' +
            'FROM user ' +
            'LEFT JOIN match_permission AS is_allowed ON is_allowed.user_id = ? AND is_allowed.allow_match_with = user.id ' +
            'LEFT JOIN match_permission AS has_given_permission ON has_given_permission.user_id = user.id AND has_given_permission.allow_match_with = ?' +
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
