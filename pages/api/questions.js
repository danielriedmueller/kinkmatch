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

export default async function handle(req, res) {
    await cors(req, res);

    let questions = db.prepare('SELECT * FROM question ORDER BY text ASC').all();

    res.json(questions);
}
