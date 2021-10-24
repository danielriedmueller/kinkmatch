import React from "react";
import style from '../styles/Logout.module.scss';
import {logout} from "../lib/db";

export function Logout(props) {

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await logout();

        if (response.ok) {
            props.logoutSuccessful()
        }
    };

    return <form onSubmit={handleSubmit} className={style.logout}>
        <div>
            <button type="submit">Logout</button>
        </div>
    </form>

}
