import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./UserContext"
import { Routing } from "./Routing";
import { CookiesProvider } from "react-cookie";
import { ConfigHelper, ConfigurationInterface, Loading } from "./components";
import { CustomLoading } from "./components/CustomLoading";

const App: React.FC = () => {

  const [isLoading, setIsLoading] = React.useState(true);
  const [tmpConfig, setTmpConfig] = React.useState<ConfigurationInterface>(null);

  const loadConfig = React.useCallback(async () => {
    const keyName = window.location.hostname.split(".")[0];
    setTmpConfig(ConfigHelper.loadCached(keyName));
    ConfigHelper.load(keyName).then(() => setIsLoading(false));
  }, []);

  React.useEffect(() => { loadConfig(); }, [loadConfig]);

  if (isLoading) {
    if (tmpConfig?.appearance.logoDark) return <CustomLoading config={tmpConfig} />
    return <Loading />
  }
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

