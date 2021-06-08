import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./UserContext"
import { Routing } from "./Routing";
import { CookiesProvider } from "react-cookie";
import { ConfigHelper, Loading } from "./components";

const App: React.FC = () => {

  const [isLoading, setIsLoading] = React.useState(true);

  const loadConfig = React.useCallback(async () => {
    const keyName = window.location.hostname.split(".")[0];
    ConfigHelper.load(keyName).then(() => setIsLoading(false));
  }, []);

  React.useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  if (isLoading) return <Loading />
  return (
    <UserProvider>
      <CookiesProvider>
        <Router>
          <Routing />
        </Router>
      </CookiesProvider>
    </UserProvider>
  );
}
export default App;

