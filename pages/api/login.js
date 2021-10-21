import withSession from "../../lib/session";
const db = require('better-sqlite3')(process.env.DATABASE_URL);

export default withSession(async (req, res) => {
    const {username, password} = req.body;

    let row = db.prepare('SELECT * FROM user WHERE username = ?').get(username);

    if (row && password === row.password) {
        const id = row.id;

        req.session.set("user", {id});
        await req.session.save();

        return res.status(201).json(id);
    }

    return res.status(403).send("");
});
