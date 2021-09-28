import React from "react";
import { useCookies } from "react-cookie";
import { ApiHelper } from "./helpers"
import { Authenticated } from "./Authenticated";
import UserContext from "./UserContext";
import { useLocation } from "react-router-dom";
import { LoginPage } from "./appBase/pageComponents/LoginPage";
import { UserHelper, ConfigHelper, Permissions } from "./helpers";
import { AppearanceHelper } from "./appBase/helpers/AppearanceHelper";
import ReactGA from "react-ga";
import { ChurchInterface, UserInterface, EnvironmentHelper } from "./helpers";

export const Login: React.FC = (props: any) => {
  const [cookies] = useCookies(["jwt"]);
  let { from } = (useLocation().state as any) || { from: { pathname: "/" } };
  const context = React.useContext(UserContext);

  const successCallback = () => {
    if (UserHelper.checkAccess(Permissions.messagingApi.chat.host)) {
      UserHelper.isHost = true;
    }
  }

  const trackChurchRegister = async (church: ChurchInterface) => {
    if (EnvironmentHelper.GoogleAnalyticsTag !== "") ReactGA.event({ category: "Church", action: "Register" });
  }

  const trackUserRegister = async (user: UserInterface) => {
    if (EnvironmentHelper.GoogleAnalyticsTag !== "") ReactGA.event({ category: "User", action: "Register" });
  }

  if (context.userName === "" || !ApiHelper.isAuthenticated) {
    let search = new URLSearchParams(props.location.search);
    let jwt = search.get("jwt") || cookies.jwt;
    let auth = search.get("auth");
    if (!jwt) jwt = "";
    if (!auth) auth = "";
    const keyName = window.location.hostname.split(".")[0];

    return (
      <LoginPage
        auth={auth}
        context={context}
        keyName={keyName}
        jwt={jwt}
        loginSuccessOverride={successCallback}
        logo={AppearanceHelper.getLogoLight(ConfigHelper.current?.appearance, null)}
        appName="StreamingLive"
        appUrl={window.location.href}
        churchRegisteredCallback={trackChurchRegister}
        userRegisteredCallback={trackUserRegister}
      />
    );
  } else {
    let path = from.pathname === "/" ? "/people" : from.pathname;
    return <Authenticated location={path}></Authenticated>;
  }
};
