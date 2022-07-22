import { ApiHelper } from "../appBase/helpers/ApiHelper";
import { CommonEnvironmentHelper } from "../appBase/helpers/CommonEnvironmentHelper";

export class EnvironmentHelper {
  static MessagingApi = "";
  static MessagingSocket = "";
  static StreamingLiveApi = "";
  static GoogleAnalyticsTag = "";
  static Common = CommonEnvironmentHelper;

  static init = () => {
    let stage = process.env.REACT_APP_STAGE;

    switch (stage) {
      case "staging": EnvironmentHelper.initStaging(); break;
      case "prod": EnvironmentHelper.initProd(); break;
      default: EnvironmentHelper.initDev(); break;
    }
    EnvironmentHelper.Common.init(stage);

    ApiHelper.apiConfigs = [
      { keyName: "AccessApi", url: EnvironmentHelper.Common.AccessApi, jwt: "", permisssions: [] },
      { keyName: "StreamingLiveApi", url: EnvironmentHelper.StreamingLiveApi, jwt: "", permisssions: [] },
      { keyName: "MessagingApi", url: EnvironmentHelper.MessagingApi, jwt: "", permisssions: [] },
      { keyName: "MembershipApi", url: EnvironmentHelper.Common.MembershipApi, jwt: "", permisssions: [] }
    ];
  }

  static initDev = () => {
    EnvironmentHelper.StreamingLiveApi = process.env.REACT_APP_STREAMINGLIVE_API || "";
    EnvironmentHelper.MessagingApi = process.env.REACT_APP_MESSAGING_API || "";
    EnvironmentHelper.MessagingSocket = process.env.REACT_APP_MESSAGING_SOCKET || "";
  }

  //NOTE: None of these values are secret.
  static initStaging = () => {
    EnvironmentHelper.StreamingLiveApi = "https://api.staging.streaminglive.church";
    EnvironmentHelper.MessagingApi = "https://messagingapi.staging.churchapps.org";
    EnvironmentHelper.MessagingSocket = "wss://socket.staging.churchapps.org";
  }

  //NOTE: None of these values are secret.
  static initProd = () => {
    EnvironmentHelper.StreamingLiveApi = "https://api.streaminglive.church";
    EnvironmentHelper.MessagingApi = "https://messagingapi.churchapps.org";
    EnvironmentHelper.MessagingSocket = "wss://socket.churchapps.org";
    EnvironmentHelper.GoogleAnalyticsTag = "UA-164774603-2";
  }

}

