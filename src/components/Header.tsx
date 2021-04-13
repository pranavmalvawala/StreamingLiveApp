import React from "react";
import { Link } from "react-router-dom"
import { NavItems, ButtonInterface, UserInterface, ChatName, UserHelper, EnvironmentHelper, ApiHelper, ChatHelper } from "."

interface Props {
    logoUrl: string,
    user: UserInterface,
    buttons: ButtonInterface[],
    nameUpdateFunction: (displayName: string) => void
}

export const Header: React.FC<Props> = (props) => {
    const [showUserMenu, setShowUserMenu] = React.useState(false);
    const [promptName, setPromptName] = React.useState(false);

    const toggleUserMenu = (e: React.MouseEvent) => { e.preventDefault(); setShowUserMenu(!showUserMenu); }

    const updateName = (displayName: string) => {
        setShowUserMenu(false);
        props.nameUpdateFunction(displayName);
    }

    const getLoginLink = () => {
        if (!ApiHelper.isAuthenticated) return (<Link to="/login" className="nav-link">Login</Link>);
        else return (<Link to="/logout" className="nav-link">Logout</Link>);
    }

    const getProfileLink = () => {
        if (!ApiHelper.isAuthenticated) return (<li className="nav-item" ><ChatName user={props.user} updateFunction={updateName} promptName={promptName} /></li>);
        else return (
            <li className="nav-item" ><Link to="/profile" className="nav-link">Profile</Link></li>);
    }
    const getSettingLink = () => {
        if (UserHelper.isHost) return (
            <li className="nav-item" ><Link to="/admin/settings" className="nav-link">Admin Dashboard</Link></li>
        );
    }

    const getUserMenu = () => {
        if (showUserMenu) return (
            <div id="userMenu">
                <div>
                    <ul className="nav flex-column d-xl-none">
                        <NavItems buttons={props.buttons} />
                    </ul>
                    <ul className="nav flex-column">
                        {getSettingLink()}
                        {getProfileLink()}
                        <li className="nav-item" >{getLoginLink()}</li>
                    </ul>
                </div>
            </div>)
        else return null;
    }
    const imgSrc = props.logoUrl !== undefined ? (EnvironmentHelper.ContentRoot + props.logoUrl) : '/images/logo-header.png'


    setTimeout(() => {
        try {
            const displayName = ChatHelper.current.user.displayName;
            if (displayName === "" || displayName === "Anonymous") {
                setShowUserMenu(true);
                setPromptName(true);
            }
        } catch { }
    }, 30000);


    return (
        <>
            <div id="header">
                <div id="logo"><img src={imgSrc} alt="logo" /></div>
                <div id="liveButtons" className="d-none d-xl-flex" >
                    <div>
                        <ul className="nav nav-fill">
                            <NavItems buttons={props.buttons} />
                        </ul>
                    </div>
                </div>
                <div id="userLink"><div><a href="about:blank" onClick={toggleUserMenu}>{props.user?.displayName || "Loading"} <i className="fas fa-chevron-down"></i></a></div></div>
            </div>
            {getUserMenu()}
        </>
    );
}


