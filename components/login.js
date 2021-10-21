import React, {useRef} from "react";
import style from '../styles/Login.module.scss';

export function Login(props) {
    const usernameInput = useRef();
    const passwordInput = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = usernameInput.current.value;
        const password = passwordInput.current.value;
        const response = await props.login(username, password);

        if (response.ok) {
            const userId = await response.json();
            props.loginSuccesful(userId)
        } else {
            props.loginFailed();
        }
    };

    return <form onSubmit={handleSubmit} className={style.login}>
        <div>
            <label>
                Benutzername: <input type="text" ref={usernameInput}/>
            </label>
        </div>
        <div>
            <label>
                Passwort: <input type="password" ref={passwordInput}/>
            </label>
        </div>
        <div>
            <button type="submit">Sign in</button>
        </div>
    </form>

}