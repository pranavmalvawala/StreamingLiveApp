import React from "react";
import { ChatMessage, ChatRoomInterface } from ".";

interface Props { room: ChatRoomInterface }

export const ChatReceive: React.FC<Props> = (props) => {
    const getMessages = () => {
        var result = [];
        if (props.room?.messages !== undefined) {
            for (let i = 0; i < props.room.messages.length; i++) {
                result.push(<ChatMessage key={i} message={props.room.messages[i]} roomName={props.room.roomName} />);
            }
        }
        setTimeout(() => {
            var cr = document.getElementById("chatReceive");
            if (cr !== null) cr.scrollTo(0, cr.scrollHeight);
        }, 50);
        return result;
    }

    return (
        <div id="chatReceive">{getMessages()}</div>
    );
}




