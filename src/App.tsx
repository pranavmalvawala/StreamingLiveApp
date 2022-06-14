import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./UserContext"
import { Routing } from "./Routing";
import { CookiesProvider } from "react-cookie";
import { ConfigHelper, ConfigurationInterface, Loading } from "./components";
import { CustomLoading } from "./components/CustomLoading";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const App: React.FC = () => {

  const [isLoading, setIsLoading] = React.useState(true);
  const [tmpConfig, setTmpConfig] = React.useState<ConfigurationInterface>(null);

  const loadConfig = React.useCallback(async () => {
    const keyName = window.location.hostname.split(".")[0];
    setTmpConfig(ConfigHelper.loadCached(keyName));
    ConfigHelper.load(keyName).then(() => setIsLoading(false));
  }, []);

  React.useEffect(() => { loadConfig(); }, [loadConfig]);

  const mdTheme = createTheme({
    palette: {
      secondary: {
        main: "#444444"
      }
    },
    components: {
      MuiTextField: { defaultProps: { margin: "normal" } },
      MuiFormControl: { defaultProps: { margin: "normal" } }
    }
  });

  if (isLoading) {
    if (tmpConfig?.appearance.logoDark) return <CustomLoading config={tmpConfig} />
    return <Loading />
  }
  return (
    <UserProvider>
      <CookiesProvider>
        <ThemeProvider theme={mdTheme}>
          <CssBaseline />
          <Router>
            <Routing />
          </Router>
        </ThemeProvider>
      </CookiesProvider>
    </UserProvider>
  );
}
export default App;

