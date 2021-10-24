import withSession from "../../lib/session";
import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
const db = require('better-sqlite3')(process.env.DATABASE_URL);

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET', 'POST', 'OPTIONS'],
    })
)

export default withSession(async (req, res) => {
    await cors(req, res);

    const {username, password} = req.body;

    let row = db.prepare('SELECT * FROM user WHERE username = ?').get(username);

    if (row) {
        if (password === row.password) {
            const id = row.id;

            req.session.set("user", {id, username});
            await req.session.save();

            return res.status(201).json(id);
        }
    } else {
        // Create Account
        db
            .prepare('INSERT INTO user (username, password) VALUES (?, ?)')
            .run(username, password);

        let row = db.prepare('SELECT * FROM user WHERE username = ?').get(username);

        const id = row.id;

        req.session.set("user", {id, username});
        await req.session.save();

        return res.status(201).json(id);
    }

    return res.status(403).send("");
});
