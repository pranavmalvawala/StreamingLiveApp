import React from "react";
import { useCookies } from "react-cookie";
import { ApiHelper, EnvironmentHelper } from "./helpers"
import { Authenticated } from "./Authenticated";
import UserContext from "./UserContext";
import { useLocation } from "react-router-dom";
import { LoginPage } from "./appBase/pageComponents/LoginPage";
import { UserHelper, ConfigHelper, Permissions } from "./helpers";
import "./Login.css";

export const Login: React.FC = (props: any) => {
    const [cookies] = useCookies(['jwt']);
    let { from } = (useLocation().state as any) || { from: { pathname: "/" } };

    const successCallback = () => {
        if (UserHelper.checkAccess(Permissions.messagingApi.chat.host)) {
            UserHelper.isHost = true;
        }
    }

    const context = React.useContext(UserContext);

    if (context.userName === "" || !ApiHelper.isAuthenticated) {
        let search = new URLSearchParams(props.location.search);
        var jwt = search.get("jwt") || cookies.jwt;
        let auth = search.get("auth");
        if (!jwt) jwt = "";
        if (!auth) auth = "";

        const config = { ...ConfigHelper.current };
        const imgSrc = config.logoSquare !== undefined ? (EnvironmentHelper.ContentRoot + config.logoSquare) : ''
    
        return (
            <LoginPage
                auth={auth}
                context={context}
                requiredKeyName={true}
                jwt={jwt}
                successCallback={successCallback}
                logoSquare={imgSrc}
                appName="StreamingLive"
            />
        );
    } else {
        let path = from.pathname === "/" ? "/people" : from.pathname;
        return <Authenticated location={path}></Authenticated>;
    }
};
