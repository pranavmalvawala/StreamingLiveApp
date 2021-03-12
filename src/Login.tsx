import React from "react";
import { ApiHelper, EnvironmentHelper } from "./helpers"
import { Authenticated } from "./Authenticated";
import UserContext from "./UserContext";
import { useLocation } from "react-router-dom";
import { LoginPage } from "./appBase/pageComponents/LoginPage";
import { UserHelper, ConfigHelper } from "./helpers";
import "./Login.css";


export const Login: React.FC = (props: any) => {

    let { from } = (useLocation().state as any) || { from: { pathname: "/" } };

    const getCookieValue = (a: string) => {
        var b = document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    };

    const successCallback = () => {
        //UserHelper.currentChurch = c;
        UserHelper.isHost = true;
        //UserHelper.user = { displayName: context.userName }
        //UserHelper.name = UserHelper.user.displayName || "";
        //context?.setUserName(UserHelper.user?.displayName || "");

        //Do Stuff
    }

    const context = React.useContext(UserContext);

    if (context.userName === "" || !ApiHelper.isAuthenticated) {
        let search = new URLSearchParams(props.location.search);
        var jwt = search.get("jwt") || getCookieValue("jwt");
        let auth = search.get("auth");
        if (jwt === undefined || jwt === null) jwt = "";
        if (auth === undefined || auth === null) auth = "";

        const config = { ...ConfigHelper.current };
        const imgSrc = config.logoSquare !== undefined ? (EnvironmentHelper.ContentRoot + config.logoSquare) : ''
    
        return (<LoginPage auth={auth} context={context} requiredKeyName={true} jwt={jwt} successCallback={successCallback} logoSquare={imgSrc} />);
    } else {
        let path = from.pathname === "/" ? "/people" : from.pathname;
        return <Authenticated location={path}></Authenticated>;
    }
};
