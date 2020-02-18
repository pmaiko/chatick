import React, {useState, useEffect, useMemo} from "react";
import { store } from "../store";
import { Link, useHistory } from 'react-router-dom';

function Header(props) {
    const history = useHistory();
    let logged = props.auth.logged;

    let logout = () => {
        props.logout();
        history.push("/");
    };

    const infoJsx = () => {
        if(logged) {
            return (
                <div className="actions">
                    <a href="#" onClick={(e) => {e.preventDefault(); logout()}}>

                        Logout
                    </a>
                </div>
            );
        }

        else {
            return(
                <div className="actions">
                    <Link to="/registration">Sign Up</Link>
                </div>

            );
        }
    };

    return (
        <div className="header">
            <div className="logo">
                Chatick
            </div>

            {infoJsx()}
        </div>
    );
}

export default store(Header);
