import React from "react";
import style from '../../styles/Social.module.scss';

export function SelectableUser(props) {
    return <div className={style.selectableuser}>
        {props.username}
        {props.isAllowed
            ? <button onClick={() => props.disallowMatching(props.userId)} >Verbieten</button>
            : <button onClick={() => props.allowMatching(props.userId)} >Erlauben</button>
        }
        {props.hasGivenPermission
            ? "+"
            : "-"
        }
    </div>
}
