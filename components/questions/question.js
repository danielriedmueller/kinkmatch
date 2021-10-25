import React from "react";
import style from '../../styles/Question.module.scss';

export function Question(props) {
    console.log(props)
    return <div className={`${style.question} ${props.choice === null ? '' : style.answered}`}>
        <h1>{props.question.text}</h1>
        <p>{props.question.description}</p>
        <div>
            <fieldset>
                <label>
                    Nein
                    <input
                        type={'radio'}
                        name={'choiceinput' + props.question.id}
                        checked={props.choice === 0 ? 'checked' : ""}
                        onChange={() => props.setChoice(props.question.id, 0)}
                    />
                </label>
                <label>
                    Ja
                    <input
                        type={'radio'}
                        name={'choiceinput' + props.question.id}
                        checked={props.choice === 1 ? 'checked' : ""}
                        onChange={() => props.setChoice(props.question.id, 1)}
                    />
                </label>
                <label>
                    Vielleicht
                    <input
                        type={'radio'}
                        name={'choiceinput' + props.question.id}
                        checked={props.choice === 2 ? 'checked' : ""}
                        onChange={() => props.setChoice(props.question.id, 2)}
                    />
                </label>
            </fieldset>
        </div>
    </div>
}
