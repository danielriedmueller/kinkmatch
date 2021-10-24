import style from '../../styles/Home.module.scss';
import React, {Component} from "react";
import withSession from "../../lib/session";
import Link from "next/link";
import {getChoices, getMatches, getQuestions} from "../../lib/db";
import {SelectableUser} from "../../components/users/selectableUser";

class Matches extends Component {
    constructor(props) {
        super(props);

        this.state = {...props};

        console.log(props.matches)
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
            <div>
                {this.state.matches.map(({id, username}) => <SelectableUser
                    key={id}
                    userId={id}
                    username={username}
                    isAllowed={true}
                    hasGivenPermission={true}
                />)}
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

    const questions = await getQuestions();
    const matches = await getMatches(user.id);

    return {
        props: {
            questions,
            user,
            matches
        }
    };
});

export default Matches;
