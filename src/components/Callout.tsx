import React from "react";
import { ChatHelper } from ".";

interface Props { callout: string, roomName: string }

export const Callout: React.FC<Props> = (props) => {

    const [edit, setEdit] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const editMode = (e: React.MouseEvent) => { e.preventDefault(); setEdit(true); }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setMessage(e.currentTarget.value); }

    const handleUpdate = (e: React.MouseEvent) => {
        e.preventDefault();
        ChatHelper.setCallout(props.roomName, message);
        setEdit(false);
    }

    const getEditSection = () => {
        return (<div className="input-group input-group-sm mb-3">
            <input id="nameText" type="text" className="form-control form-control-sm" placeholder="Callout message" value={message} onChange={handleChange} />
            <div className="input-group-append input-group-append-sm">
                <button id="setNameButton" className="btn btn-primary btn-sm" onClick={handleUpdate}>Update</button>
            </div>
        </div>)
    }


    if (ChatHelper.user?.isHost) {
        if (edit) return getEditSection();
        else {
            if (props.callout === "") return <div id="callout"><a href="about:blank" onClick={editMode}>Set Callout</a></div>;
            else return (<div id="callout"><span style={{ float: "right" }}><a href="about:blank" onClick={editMode}><i className="fas fa-pencil-alt"></i></a></span>{ChatHelper.insertLinks(props.callout)}</div>);
        }
    } else {
        if (props.callout === "") return null;
        else return (<div id="callout">{ChatHelper.insertLinks(props.callout)}</div>);
    }
}




