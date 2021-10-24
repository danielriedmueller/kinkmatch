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

    const matches = await fetchMatches(id);

    res.json(matches);
}

export async function fetchMatches(id) {
    let matches = db
        .prepare('SELECT id, username ' +
            'FROM user ' +
            'JOIN match_permission AS is_allowed ON is_allowed.user_id = ? ' +
            'JOIN match_permission AS has_given_permission ON has_given_permission.allow_match_with = ? ' +
            'WHERE id <> ?'
        )
        .all(id, id, id);

    const positiveChoicesFromSelf = db.prepare('SELECT question_id, choice FROM choice WHERE choice <> 0 AND user_id = ?').all(id);

    let positiveChoicesFromOthers = [];
    matches.forEach(({id}) => {
        positiveChoicesFromOthers[id] = db.prepare('SELECT question_id, choice FROM choice WHERE choice <> 0 AND user_id = ?').all(id);
    })

    const calcedMatches = calcMatches(positiveChoicesFromSelf, positiveChoicesFromOthers);

    return matches.map(({id, username}) => ({
        id,
        username,
        matches: calcedMatches[id]
    }));
}

function calcMatches(positiveChoicesFromSelf, positiveChoicesFromOthers) {
    let matches = [];

    for (let [userId, choices] of Object.entries(positiveChoicesFromOthers)) {
        userId = parseInt(userId);
        let otherUser = {userId, questions: []};

        choices.forEach(({question_id, choice}) => {
            const ownChoice = positiveChoicesFromSelf.find(x => x.question_id = question_id);

            if (ownChoice) {
                otherUser.questions.push({
                    questionId: question_id,
                    ownChoice: ownChoice.choice,
                    otherChoice: choice
                })
            }
        })

        matches.push(otherUser)
    }

    return matches.filter(({userId, questions}) => questions.length === 0);
}
