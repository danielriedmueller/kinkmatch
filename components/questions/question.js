import React from "react";
import style from '../../styles/Question.module.scss';

export function Question(props) {
    console.log(props)
    return <div className={`${style.question} ${props.choice === null ? '' : style.answered}`}>
        <h1>{props.question.text}</h1>
        <div>
            <button onClick={() => props.setChoice(props.question.id, 0)}>Nope!</button>
            <button onClick={() => props.setChoice(props.question.id, 1)}>Ja!</button>
            <button onClick={() => props.setChoice(props.question.id, 2)}>Hmm, vielleicht</button>
        </div>
        <p>{props.question.description}</p>
    </div>
}
