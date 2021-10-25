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
            'JOIN match_permission AS is_allowed ON is_allowed.user_id = ? AND is_allowed.allow_match_with = user.id ' +
            'JOIN match_permission AS has_given_permission ON has_given_permission.user_id = user.id AND has_given_permission.allow_match_with = ?' +
            'WHERE id <> ?'
        )
        .all(id, id, id);

    const positiveChoicesFromSelf = db.prepare('SELECT question_id, choice FROM choice WHERE choice <> 0 AND user_id = ?').all(id);

    let choicesFromOthers = {};
    matches.forEach(({id}) => {
        choicesFromOthers[id] = db.prepare('SELECT question_id, choice FROM choice WHERE user_id = ?').all(id);
    })

    matches = matches.map(({id, username}) => ({
        id,
        username,
        choices: calcMatches(id, positiveChoicesFromSelf, choicesFromOthers),
        questionsAnswered: choicesFromOthers[id].length
    }));

    return matches.filter(({id, username, choices}) => choices.length !== 0);
}

function calcMatches(userId, positiveChoicesFromSelf, choicesFromOthers) {
    let matches = [];

    positiveChoicesFromSelf.forEach(({question_id, choice}) => {
        const choiceFromOther = choicesFromOthers[userId].find(x => x.question_id === question_id);

        if (choiceFromOther && isChoicePositive(choiceFromOther.choice)) {
            matches.push({
                questionId: question_id,
                ownChoice: choice,
                otherChoice: choiceFromOther.choice
            })
        }
    })

    return matches;
}

const isChoicePositive = (choice) => choice !== 0;
