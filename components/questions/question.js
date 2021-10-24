import React from "react";
import style from '../../styles/Question.module.scss';

export function Question(props) {
    return <div className={style.question}>
        {props.text}
    </div>
}
