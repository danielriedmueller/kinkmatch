import React, {useRef} from "react";
import style from '../styles/Login.module.scss';
import {login} from "../lib/db";

export function Login(props) {
    const usernameInput = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = usernameInput.current.value;
        const response = await login(username);

        if (response.ok) {
            const {userId, username} = await response.json();
            props.loginSuccessful(userId, username)
        } else {
            props.loginFailed();
        }
    };

    return <form onSubmit={handleSubmit} className={style.login}>
        <div>
            <label>
                <input type="text" placeholder={'Benutzername'} ref={usernameInput}/><button type="submit">Go!</button>
            </label>
        </div>
    </form>
}
