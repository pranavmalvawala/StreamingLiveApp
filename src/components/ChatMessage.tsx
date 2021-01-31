import React from "react";
import { ChatMessageInterface, ChatHelper } from ".";

interface Props { message: ChatMessageInterface, roomName: string }

export const ChatMessage: React.FC<Props> = (props) => {

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        ChatHelper.sendDelete(props.roomName, props.message.timestamp)
    }

    const getDeleteLink = () => {
        if (!ChatHelper.user.isHost) return null;
        else {
            return <span className="delete"><a href="about:blank" onClick={handleDelete}><i className="far fa-trash-alt"></i></a></span>
        }

    }

    const className = (props.message.displayName.indexOf("Facebook") > -1) ? "message understate" : "message"
    return (
        <div className={className}>
            {getDeleteLink()}
            <b>{props.message.displayName}:</b> <span dangerouslySetInnerHTML={{ __html: ChatHelper.insertLinks(props.message.message) }}></span>
        </div >
    );
}




