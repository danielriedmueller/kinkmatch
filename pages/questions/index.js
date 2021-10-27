import styleHome from '../../styles/Home.module.scss';
import style from '../../styles/Question.module.scss';
import React, {Component} from "react";
import withSession from "../../lib/session";
import Link from "next/link";
import {Question} from "../../components/questions/question";
import {getChoices, getQuestions, resetChoices, setChoice} from "../../lib/db";

class Questions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: props.questions,
            user: props.user
        };

        this.setChoice = this.setChoice.bind(this);
        this.resetChoices = this.resetChoices.bind(this);
    }

    async setChoice(questionId, choice) {
        const choices = await setChoice(questionId, this.state.user.id, choice);
        let user = this.state.user;
        user.choices = choices;
        this.setState(user);
    }


    async resetChoices() {
        let user = this.state.user;
        await resetChoices(user.id);
        user.choices = [];
        this.setState(user);
    }

    findUserChoice(questionId) {
        let choice = this.state.user.choices.filter(({question_id, user_id, choice}) => questionId === question_id);

        if (choice === undefined) {
            choice = null;
        }

        if (choice && Array.isArray(choice) && choice.length === 1) {
            return choice[0].choice
        }

        return null;
    }

    render() {
        if (!this.state.user) {
            return <div id="app" className={style.container}>
                <Link href="/">
                    <a>Zum Login</a>
                </Link>
            </div>
        }

        return <div id="app" className={styleHome.container}>
            <Link href="/">
                <a>Zurück</a>
            </Link>
            <Link href="/social">
                <a>Weiter</a>
            </Link>
            <div>{this.state.user.choices.length} von {this.state.questions.length} Fragen beantwortet <button onClick={this.resetChoices}>Reset</button></div>
            <div className={style.questions}>
                {this.state.questions.map((question) => <Question
                    key={question.id}
                    question={question}
                    setChoice={this.setChoice}
                    choice={this.findUserChoice(question.id)} />
                )}
            </div>
        </div>
    }
}

export const getServerSideProps = withSession(async function ({ req, res }) {
    let user = req.session.get("user");

    if (user === undefined) {
        user = null;
    }

    if (user) {
        user.choices = await getChoices(user.id);
    }

    let questions = await getQuestions();
    questions = questions.reverse();

    return {
        props: {
            questions,
            user
        }
    };
});

export default Questions;
