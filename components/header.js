import React from "react";
import style from '../styles/Header.module.scss';
import {Logout} from "./logout";
import {Login} from "./login";

export function Header(props) {

    return <div className={style.header}>
        {props.user
            ? "Hallo " + props.user.username
            : ""
        }
        {props.user
            ? <Logout logoutSuccessful={props.logoutSuccessful}/>
            : null
        }
    </div>

}
