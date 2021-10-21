import style from '../styles/Home.module.scss';
import React, {Component} from "react";
import {Login} from "../components/login";
import {Logout} from "../components/logout";
import withSession from "../lib/session";
import {Questionlist} from "../components/questionlist";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: props.questions,
            user: props.user,
            loginFailed: false,
        };

        this.login = this.login.bind(this);
        this.loginSuccessful = this.loginSuccessful.bind(this);
        this.loginFailed = this.loginFailed.bind(this);
        this.logout = this.logout.bind(this);
        this.logoutSuccessful = this.logoutSuccessful.bind(this);
    }

    async login(username, password) {
        return fetch(process.env.NEXT_PUBLIC_API_LOGIN, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password})
        });
    }

    async loginSuccessful(id) {
        const response = await fetch(process.env.NEXT_PUBLIC_API_CHOICES);
        const choices = await response.json();

        this.setState({
            user: {id, choices},
            loginFailed: false,
        });
    }

    async loginFailed() {
        this.setState({
            user: null,
            loginFailed: true
        });
    }

    async logout() {
        return fetch(process.env.NEXT_PUBLIC_API_LOGOUT, {
            method: "POST"
        });
    }

    logoutSuccessful() {
        this.setState({
            user: null,
            choices: []
        });
    }

    render() {
        return <div id="app" className={style.container}>
            {this.state.user
                ? <Logout logout={this.logout} logoutSuccessful={this.logoutSuccessful}/>
                : <Login login={this.login} loginSuccesful={this.loginSuccessful} loginFailed={this.loginFailed}/>
            }

            {this.state.loginFailed ? "Benutzername oder Passwort falsch." : ""}
            <Questionlist questions={this.state.questions} />
        </div>
    }
}

export const getServerSideProps = withSession(async function ({ req, res }) {
    let user = req.session.get("user");

    if (user === undefined) {
        user = null;
    }

    if (user) {
        const response = await fetch(process.env.NEXT_PUBLIC_API_CHOICES);
        user.choices = await response.json();
    }

    const response = await fetch(process.env.NEXT_PUBLIC_API_QUESTIONS);
    const questions = await response.json();

    return {
        props: {
            questions,
            user
        }
    };
});

export default Home;
