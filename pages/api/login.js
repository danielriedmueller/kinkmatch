import withSession from "../../lib/session";
const db = require('better-sqlite3')(process.env.DATABASE_URL);

export default withSession(async (req, res) => {
    const {username} = req.body;

    let row = db.prepare('SELECT * FROM user WHERE username = ?').get(username);

    // Create Account
    if (!row) {
        db
            .prepare('INSERT INTO user (username) VALUES (?)')
            .run(username);

        row = db.prepare('SELECT * FROM user WHERE username = ?').get(username);
    }

    const id = row.id;

    req.session.set("user", {id, username});
    await req.session.save();

    return res.status(201).json({id, username});
});
