import { ApiHelper } from "../appBase/helpers/ApiHelper";

export class EnvironmentHelper {
    static AccountsApp = "";
    static AccessApi = "";
    static StreamingLiveApi = "";
    static MessagingApi = "";
    static MessagingSocket = "";
    static AdminUrl = "";
    static ContentRoot = "";
    static SubUrl = "";
    static GoogleAnalyticsTag = "";

    static init = () => {
        switch (process.env.REACT_APP_STAGE) {
            case "staging": EnvironmentHelper.initStaging(); break;
            case "prod": EnvironmentHelper.initProd(); break;
            default: EnvironmentHelper.initDev(); break;
        }

        ApiHelper.apiConfigs = [
            { keyName: "AccessApi", url: EnvironmentHelper.AccessApi, jwt: "", permisssions: [] },
            { keyName: "StreamingLiveApi", url: EnvironmentHelper.StreamingLiveApi, jwt: "", permisssions: [] },
            { keyName: "MessagingApi", url: EnvironmentHelper.MessagingApi, jwt: "", permisssions: [] },
        ];
        ApiHelper.defaultApi = "StreamingLiveApi";
    }

    static initDev = () => {
        EnvironmentHelper.AccountsApp = process.env.REACT_APP_ACCOUNTS_APP || "";
        EnvironmentHelper.AccessApi = process.env.REACT_APP_ACCESS_API || "";
        EnvironmentHelper.StreamingLiveApi = process.env.REACT_APP_STREAMINGLIVE_API || "";
        EnvironmentHelper.MessagingApi = process.env.REACT_APP_MESSAGING_API || "";
        EnvironmentHelper.MessagingSocket = process.env.REACT_APP_MESSAGING_SOCKET || "";
        EnvironmentHelper.AdminUrl = process.env.REACT_APP_ADMIN_URL || "";
        EnvironmentHelper.ContentRoot = process.env.REACT_APP_CONTENT_ROOT || "";
        EnvironmentHelper.SubUrl = process.env.REACT_APP_SUB_URL || "";
    }

    //NOTE: None of these values are secret.
    static initStaging = () => {
        EnvironmentHelper.AccountsApp = "https://accounts.staging.churchapps.org";
        EnvironmentHelper.AccessApi = "https://accessapi.staging.churchapps.org";
        EnvironmentHelper.StreamingLiveApi = "https://api.staging.streaminglive.church";
        EnvironmentHelper.MessagingApi = "https://messagingapi.staging.churchapps.org";
        EnvironmentHelper.MessagingSocket = "wss://socket.staging.churchapps.org";
        EnvironmentHelper.AdminUrl = "https://admin.staging.streaminglive.church";
        EnvironmentHelper.ContentRoot = "";
        EnvironmentHelper.SubUrl = "https://{key}.staging.streaminglive.church";
    }

    //NOTE: None of these values are secret.
    static initProd = () => {
        EnvironmentHelper.AccountsApp = "https://accounts.churchapps.org";
        EnvironmentHelper.AccessApi = "https://accessapi.churchapps.org";
        EnvironmentHelper.StreamingLiveApi = "https://api.streaminglive.church";
        EnvironmentHelper.MessagingApi = "https://messagingapi.churchapps.org";
        EnvironmentHelper.MessagingSocket = "wss://socket.churchapps.org";
        EnvironmentHelper.AdminUrl = "https://admin.streaminglive.church";
        EnvironmentHelper.ContentRoot = "";
        EnvironmentHelper.SubUrl = "https://{key}.streaminglive.church";
        EnvironmentHelper.GoogleAnalyticsTag = "UA-164774603-2";
    }

}

