import React from "react";
import style from '../../styles/Social.module.scss';

export function SelectableUser(props) {
    return <div className={style.selectableuser}>
        {props.username}
        <div>{props.questionsAnswered} von {props.questions.length} Fragen beantwortet</div>
        <div>
            {props.choices.map(({questionId, ownChoice, otherChoice}) => {
                return <div key={questionId}>
                    {props.questions.find(({id, text}) => id === questionId).text}
                    {ownChoice === 1 ? "ja" : "vielleicht"}
                    {otherChoice === 1 ? "ja" : "vielleicht"}
                </div>
            })}
        </div>
    </div>
}
