import React from "react";
import style from '../../styles/Social.module.scss';

export function SelectableUser(props) {
    console.log(props)
    return <div
        className={`${style.selectableuser} ${props.isAllowed ? style.isAllowed : ''} ${props.hasGivenPermission ? style.hasGivenPermission : ''}`}
        onClick={() => props.isAllowed ? props.disallowMatching(props.userId) : props.allowMatching(props.userId)}
    >{props.username}</div>
}
