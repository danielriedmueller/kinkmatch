import React from "react";
import style from '../../styles/Question.module.scss';

export function Question(props) {
    return <div className={style.question}>
        {props.text}
        <div>
            <fieldset>
                <label>
                    Ja
                    <input
                        type={'radio'}
                        name={'choiceinput' + props.questionId}
                        checked={props.choice === 0 ? 'checked' : ""}
                        onChange={() => props.setChoice(props.questionId, 0)}
                    />
                </label>
                <label>
                    Nein
                    <input
                        type={'radio'}
                        name={'choiceinput' + props.questionId}
                        checked={props.choice === 1 ? 'checked' : ""}
                        onChange={() => props.setChoice(props.questionId, 1)}
                    />
                </label>
                <label>
                    Vielleicht
                    <input
                        type={'radio'}
                        name={'choiceinput' + props.questionId}
                        checked={props.choice === 2 ? 'checked' : ""}
                        onChange={() => props.setChoice(props.questionId, 2)}
                    />
                </label>
            </fieldset>
        </div>
    </div>
}
