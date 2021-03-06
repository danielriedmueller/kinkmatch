import React from "react";
import style from '../styles/Header.module.scss';
import {Logout} from "./logout";
import {Login} from "./login";

export function Header(props) {
    return <div className={style.header}>
        {props.user
            ? <div>Hallo {props.user.username}! </div>
            : <Login loginSuccessful={props.loginSuccessful} loginFailed={props.loginFailed} />
        }
    </div>

}
