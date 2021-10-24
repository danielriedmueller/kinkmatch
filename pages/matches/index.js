import style from '../../styles/Home.module.scss';
import React, {Component} from "react";
import withSession from "../../lib/session";
import Link from "next/link";
import {getChoices, getQuestions} from "../../lib/db";

class Matches extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: props.questions,
            user: props.user
        };
    }

    render() {
        if (!this.state.user) {
            return <div id="app" className={style.container}>
                <Link href="/">
                    <a>Zum Login</a>
                </Link>
            </div>
        }

        return <div id="app" className={style.container}>
            <Link href="/">
                <a>Zurück</a>
            </Link>
            MATCHES
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

    const questions = await getQuestions();

    return {
        props: {
            questions,
            user
        }
    };
});

export default Matches;
