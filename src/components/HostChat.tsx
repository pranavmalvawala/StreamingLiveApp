import React from "react";
import { ChatSend, Attendance, ChatReceive, ChatStateInterface, ConfigHelper, ChatHelper } from ".";

interface Props { chatState: ChatStateInterface | undefined, visible: boolean }

export const HostChat: React.FC<Props> = (props) => {
    return (
        <div className="chatContainer" style={(props.visible) ? {} : { display: "none" }} >
            <Attendance viewers={ChatHelper.getOrCreateRoom(props.chatState, "church_" + ConfigHelper.current.churchId + "_host").viewers} />
            <ChatReceive room={ChatHelper.getOrCreateRoom(props.chatState, "church_" + ConfigHelper.current.churchId + "_host")} />
            <ChatSend room={"church_" + ConfigHelper.current.churchId + "_host"} />
        </div>
    );
}




