import style from '../../styles/Home.module.scss';
import React, {Component} from "react";
import withSession from "../../lib/session";
import Link from "next/link";

class Social extends Component {
    constructor(props) {
        super(props);

        this.state = {user: props.user};
    }

    render() {
        if (!this.state.user) {
            return <div id="app" className={style.container}>
                <Link href="/">
                    <a>Zum Login</a>
                </Link>
            </div>
        }

        return <div id="app" className={style.container}>
            <Link href="/">
                <a>Zurück</a>
            </Link>
            SOCIAL
        </div>
    }
}

export const getServerSideProps = withSession(async function ({ req, res }) {
    let user = req.session.get("user");

    if (user === undefined) {
        user = null;
    }

    return {
        props: {user}
    };
});

export default Social;
