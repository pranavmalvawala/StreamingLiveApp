import React from "react";
import { Helmet } from 'react-helmet'
import { ServicesHelper, ConversationInterface, ApiHelper, UserHelper, ConfigHelper, ConfigurationInterface, ServiceInterface, Header, VideoContainer, InteractionContainer, ChatStateInterface, EnvironmentHelper } from "./components";
import { ChatHelper } from "./helpers/ChatHelper";
import { SocketHelper } from "./helpers/SocketHelper";

const defaultColors = {
  primaryColor: "#08A0CC",
  primaryContrast: "#FFFFFF",
  secondaryColor: "#FFBA1A",
  secondaryContrast: "#000000"
}

export const Home: React.FC = () => {
  const [config, setConfig] = React.useState<ConfigurationInterface>({} as ConfigurationInterface);
  const [currentService, setCurrentService] = React.useState<ServiceInterface | null>(null);
  const [chatState, setChatState] = React.useState<ChatStateInterface>(null);

  const loadConfig = React.useCallback(async (firstLoad: boolean) => {
    const keyName = window.location.hostname.split(".")[0];

    ConfigHelper.load(keyName).then(data => {
      var d: ConfigurationInterface = data;

      ChatHelper.initChat().then(() => {
        joinMainRoom(data.churchId);
      });


      checkHost(d);
      setConfig(d);
      //if (firstLoad) initChat();
    });

  }, []);


  const joinMainRoom = async (churchId: string) => {
    const conversation: ConversationInterface = await ApiHelper.getAnonymous("/conversations/current/" + churchId + "/streamingLive/chat", "MessagingApi");
    ChatHelper.current.mainRoom = {
      messages: [],
      attendance: { conversationId: conversation.id, totalViewers: 0, viewers: [] },
      callout: { content: "" },
      conversationId: conversation.id
    };
    setChatState(ChatHelper.current);
    ChatHelper.joinRoom(conversation);
  }


  const checkHost = async (d: ConfigurationInterface) => {
    if (UserHelper.isHost) {
      d.tabs.push({ type: "hostchat", text: "Host Chat", icon: "fas fa-users", data: "", url: "" });
      const hostConversation: ConversationInterface = await ApiHelper.get("/conversations/current/" + d.churchId + "/streamingLiveHost/chat", "MessagingApi");
      ChatHelper.current.hostRoom = {
        messages: [],
        attendance: { conversationId: hostConversation.id, totalViewers: 0, viewers: [] },
        callout: { content: "" },
        conversationId: hostConversation.id
      };
      setChatState(ChatHelper.current);
      setTimeout(() => {
        console.log("HOST conversation");
        console.log(hostConversation);
        ChatHelper.joinRoom(hostConversation);
      }, 500);

    }
  }

  /*
  const initChat = () => {
    setTimeout(function () {
      ChatHelper.init((state: ChatStateInterface) => { setChatState(state); setConfig(ConfigHelper.current); });
      setChatState(ChatHelper.state);
    }, 500);
  }*/

  const handleNameUpdate = (displayName: string) => {
    const data = { socketId: SocketHelper.socketId, name: displayName };
    ApiHelper.postAnonymous("/connections/setName", data, "MessagingApi");
    ChatHelper.current.user.displayName = displayName;
    ChatHelper.onChange();
  }

  const handleLoginChange = () => {
    //setChatUser(ChatHelper.user);
    //loadConfig(false);
  }


  const initUser = () => {
    const chatUser = ChatHelper.getUser();
    if (ApiHelper.isAuthenticated) {
      chatUser.displayName = UserHelper.user?.displayName || "Anonymous";
      chatUser.isHost = true;
      ChatHelper.current.user = chatUser;
    }
  }


  //setChatUser(ChatHelper.user);*/

  React.useEffect(() => {
    ChatHelper.onChange = () => { setChatState({ ...ChatHelper.current }); }
    ServicesHelper.initTimer((cs) => { setCurrentService(cs) });
    loadConfig(true);
    setCurrentService(ServicesHelper.currentService);
    initUser();
  }, [loadConfig]);

  let css = null;
  if (config.keyName) {
    css = (<style type="text/css">{`
    :root { 
      --primaryColor: ${config?.primaryColor || defaultColors.primaryColor}; 
      --primaryContrast: ${config?.primaryContrast || defaultColors.primaryContrast}; 
      --secondaryColor: ${config?.secondaryColor || defaultColors.secondaryColor};
      --secondaryContrast: ${config?.secondaryContrast || defaultColors.secondaryContrast};
    }
    `}</style>)
  }

  if (chatState === null) {
    const imgSrc = config.logoSquare !== undefined ? (EnvironmentHelper.ContentRoot + config.logoSquare) : '/images/logo-login.png'

    return (
      <div className="smallCenterBlock" style={{ marginTop: 100 }} >
        <img src={imgSrc} alt="logo" className="img-fluid" style={{ marginBottom: 50 }} />
        <div className="text-center">Loading..</div>
      </div>
    );
  } else return (
    <>
      <Helmet>
        {css}
      </Helmet>
      <div id="liveContainer">
        <Header logoUrl={config?.logoHeader} buttons={config.buttons} user={chatState?.user} nameUpdateFunction={handleNameUpdate} loginChangeFunction={handleLoginChange} />
        <div id="body">
          <VideoContainer currentService={currentService} />
          <InteractionContainer tabs={config.tabs} chatState={chatState} />
        </div>
      </div>
    </>
  );
}
