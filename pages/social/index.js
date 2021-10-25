import homeStyle from '../../styles/Home.module.scss';
import style from '../../styles/Social.module.scss';
import React, {Component} from "react";
import withSession from "../../lib/session";
import Link from "next/link";
import {allowMatchWith, disallowMatchWith, getMatchPermissions} from "../../lib/db";
import {SelectableUser} from "../../components/users/selectableUser";

class Social extends Component {
    constructor(props) {
        super(props);

        this.state = {...props};

        this.allowMatching = this.allowMatching.bind(this);
        this.disallowMatching = this.disallowMatching.bind(this);
    }

    async allowMatching(userId) {
        const permissions = await allowMatchWith(this.state.user.id, userId);

        this.setState({
            permissions: permissions
        });
    }

    async disallowMatching(userId) {
        const permissions = await disallowMatchWith(this.state.user.id, userId);

        this.setState({
            permissions: permissions
        });
    }

    render() {
        if (!this.state.user) {
            return <div id="app" className={homeStyle.container}>
                <Link href="/">
                    <a>Zum Login</a>
                </Link>
            </div>
        }

        return <div id="app" className={homeStyle.container}>
            <Link href="/">
                <a>Zurück</a>
            </Link>
            <Link href="/matches">
                <a>Weiter</a>
            </Link>
            <div className={style.userselection}>
                <div>
                    {this.state.permissions.map(({id, username, isAllowed, hasGivenPermission}) => <SelectableUser
                        key={id}
                        userId={id}
                        username={username}
                        isAllowed={isAllowed}
                        hasGivenPermission={hasGivenPermission}
                        allowMatching={this.allowMatching}
                        disallowMatching={this.disallowMatching}
                    />)}
                </div>
            </div>
        </div>
    }
}

export const getServerSideProps = withSession(async function ({ req, res }) {
    let user = req.session.get("user");

    if (user === undefined) {
        user = null;
    }

    const permissions = await getMatchPermissions(user.id);

    return {props: {user, permissions}};
});

export default Social;
