import React from "react";
import style from '../styles/questionlist.module.scss';

export function Questionlist(props) {

    return <div className={style.questionlist}>
        <table>
            <tbody>
            {props.questions.map(({id, text}) => {
                return <tr key={id}>
                    <td>{text}</td><td><input type="checkbox"/></td>
                </tr>;
            })}
            </tbody>
        </table>
    </div>

}
