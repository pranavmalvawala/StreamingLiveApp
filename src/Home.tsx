import React from "react";
import { ServicesHelper, ConversationInterface, ApiHelper, UserHelper, ConfigHelper, ConfigurationInterface, ServiceInterface, Header, VideoContainer, InteractionContainer, ChatStateInterface, Theme } from "./components";
import { ChatHelper } from "./helpers/ChatHelper";
import { SocketHelper } from "./helpers/SocketHelper";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"

export const Home: React.FC = () => {
  const [config, setConfig] = React.useState<ConfigurationInterface>({} as ConfigurationInterface);
  const [currentService, setCurrentService] = React.useState<ServiceInterface | null>(null);
  const [chatState, setChatState] = React.useState<ChatStateInterface>(null);
  const navigate = useNavigate()

  const loadConfig = React.useCallback(async () => {
    setConfig(ConfigHelper.current);
    ChatHelper.initChat(); //.then(() => joinMainRoom(ConfigHelper.current.churchId));
    //checkHost(ConfigHelper.current);
    setConfig(c => ({ ...c, ...ConfigHelper.current }));
  }, []);

  const joinMainRoom = async (churchId: string) => {
    if (currentService) {
      const conversation: ConversationInterface = await ApiHelper.getAnonymous("/conversations/current/" + churchId + "/streamingLive/" + currentService.id, "MessagingApi");
      ChatHelper.current.mainRoom = ChatHelper.createRoom(conversation);
      ChatHelper.current.mainRoom.conversation.title = "Chat";
      setChatState(ChatHelper.current);
      ChatHelper.joinRoom(conversation.id, conversation.churchId);
      ChatHelper.current.mainRoom.joined = true;
    }
  }

  const checkHost = async (d: ConfigurationInterface) => {
    if (UserHelper.isHost) {
      d.tabs.push({ type: "hostchat", text: "Host Chat", icon: "group", data: "", url: "" });
      const hostConversation: ConversationInterface = await ApiHelper.get("/conversations/current/" + d.churchId + "/streamingLiveHost/chat", "MessagingApi");
      ChatHelper.current.hostRoom = ChatHelper.createRoom(hostConversation);
      ChatHelper.current.hostRoom.conversation.title = "Host Chat";
      setChatState(ChatHelper.current);
      setTimeout(() => {
        ChatHelper.joinRoom(hostConversation.id, hostConversation.churchId);
        ChatHelper.current.hostRoom.joined = true;
      }, 500);
    }
  }

  const handleNameUpdate = (displayName: string) => {
    //const displayName = `${firstName} ${lastName}`
    const data = { socketId: SocketHelper.socketId, name: displayName };
    ApiHelper.postAnonymous("/connections/setName", data, "MessagingApi");
    ChatHelper.current.user.firstName = displayName;
    ChatHelper.current.user.lastName = "";
    Cookies.set("displayName", displayName);
    ChatHelper.onChange();
  }

  const initUser = () => {
    const chatUser = ChatHelper.getUser();
    if (ApiHelper.isAuthenticated) {
      const { firstName, lastName } = UserHelper.user;
      chatUser.firstName = firstName || "Anonymous";
      chatUser.lastName = lastName || "";
      chatUser.isHost = true;
      ChatHelper.current.user = chatUser;
      ChatHelper.onChange();
    }
  }

  const checkJoinRooms = () => {
    if (currentService && config) {
      joinMainRoom(ConfigHelper.current.churchId);
      checkHost(config);
    }
  }

  React.useEffect(() => {
    ChatHelper.onChange = () => {
      setChatState({ ...ChatHelper.current });
      setConfig({ ...ConfigHelper.current });
    }
    ServicesHelper.initTimer((cs) => { setCurrentService(cs) });
    loadConfig();
    setCurrentService(ServicesHelper.currentService);
    initUser();
  }, [loadConfig]);

  React.useEffect(() => {
    const jwt = Cookies.get("jwt")

    if (jwt && ChatHelper.current.user.firstName === "Anonymous") {
      navigate("/login")
    }
  }, [navigate]);

  React.useEffect(checkJoinRooms, [currentService]); //eslint-disable-line

  return (
    <>
      <Theme />
      <div id="liveContainer">
        <Header user={chatState?.user} nameUpdateFunction={handleNameUpdate} />
        <div id="body">
          <VideoContainer currentService={currentService} jitsiRoom={config.jitsiRoom} user={chatState?.user} />
          <InteractionContainer chatState={chatState} config={config} />
        </div>
      </div>
    </>
  );
}
