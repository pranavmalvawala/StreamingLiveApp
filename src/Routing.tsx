import React from "react";
import UserContext from "./UserContext"
import { Authenticated } from "./Authenticated"
import { Unauthenticated } from "./Unauthenticated"
import { ApiHelper } from "./components"
import { EnvironmentHelper } from "./helpers";
import ReactGA from "react-ga";
import { useLocation } from "react-router-dom";

export const Routing: React.FC = () => {
  const location = useLocation();
  if (EnvironmentHelper.GoogleAnalyticsTag !== "") {
    ReactGA.initialize(EnvironmentHelper.GoogleAnalyticsTag);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  React.useEffect(() => { if (EnvironmentHelper.GoogleAnalyticsTag !== "") ReactGA.pageview(location.pathname + location.search); }, [location]);

  let user = React.useContext(UserContext)?.user; //to force rerender on login
  if (user === null || !ApiHelper.isAuthenticated) {
    return <Unauthenticated />;
  }
  else {
    return <Authenticated />;
  }
}
