import React, {useState, useEffect, useMemo} from "react";
import { store } from "../store";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";

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
                <a href="#" onClick={(e) => {e.preventDefault(); logout()}}>
                    Logout
                </a>
            );
        }

        else {
            return(
                <Link to="/registration">Sign Up</Link>
            );
        }
    };

    return (
        <div className="header">
            {logged.toString()}
            <div className="logo">
            </div>

            {infoJsx()}
        </div>
    );
}

export default store(Header);
