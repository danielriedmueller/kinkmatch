import style from '../styles/Home.module.scss';
import React, {Component} from "react";
import withSession from "../lib/session";
import Link from "next/link";
import {Header} from "../components/header";
import Head from 'next/head'

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            loginFailed: false,
        };

        this.loginSuccessful = this.loginSuccessful.bind(this);
        this.loginFailed = this.loginFailed.bind(this);
        this.logoutSuccessful = this.logoutSuccessful.bind(this);
    }

    async loginSuccessful(id, username) {
        this.setState({
            user: {id, username},
            loginFailed: false,
        });
    }

    async loginFailed() {
        this.setState({
            user: null,
            loginFailed: true
        });
    }

    logoutSuccessful() {
        this.setState({
            user: null,
            loginFailed: false
        });
    }

    render() {
        return <div id="app" className={style.container}>
            <Header
                user={this.state.user}
                logoutSuccessful={this.logoutSuccessful}
                loginSuccessful={this.loginSuccessful}
                loginFailed={this.loginFailed}
            />
            {this.state.loginFailed ? "Benutzername oder Passwort falsch oder Benutzer existiert bereits." : ""}
            {this.state.user
                ? <ul>
                    <li>
                        <Link href="/questions">
                            <a>Zu den Fragen</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/social">
                            <a>Mit wem soll gematched werden?</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/matches">
                            <a>Matches ansehen!</a>
                        </Link>
                    </li>
                </ul>
                : null
            }
        </div>
    }
}

export const getServerSideProps = withSession(async function ({ req, res }) {
    let user = req.session.get("user");

    if (user === undefined) {
        user = null;
    }

    return {
        props: {user}
    };
});

export default Home;
