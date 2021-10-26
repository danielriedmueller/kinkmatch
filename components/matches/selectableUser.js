import React from "react";
import style from '../../styles/Social.module.scss';

export function SelectableUser(props) {
    return <div className={style.selectableuser}>
        <div>{props.questionsAnswered} von {props.questions.length} Fragen beantwortet</div>
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Kink</th>
                        <th>Du</th>
                        <th>{props.username}</th>
                    </tr>
                    {props.choices.map(({questionId, ownChoice, otherChoice}) => {
                        return <tr key={questionId}>
                            <td>{props.questions.find(({id, text}) => id === questionId).text}</td>
                            <td>{ownChoice === 1 ? "ja" : "vielleicht"}</td>
                            <td>{otherChoice === 1 ? "ja" : "vielleicht"}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </div>
}
