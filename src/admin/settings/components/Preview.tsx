import React from "react";
import { Link } from "react-router-dom"
import { UserHelper, EnvironmentHelper } from ".";

interface Props { ts: number }
export const Preview: React.FC<Props> = (props) => {
    return (
        <div className="inputBox">
            <div className="header"><i className="far fa-calendar-alt"></i> Preview</div>
            <div className="content">
                <div id="previewWrapper">
                    <iframe id="previewFrame" src={EnvironmentHelper.SubUrl.replace("{key}", UserHelper.currentChurch.subDomain) + "/?preview=1&ts=" + props.ts} title="Preview" ></iframe>
                </div>
                <p style={{ marginTop: 10, marginBottom: 10 }}>View your live site: <Link to={"/"}>{EnvironmentHelper.SubUrl.replace("{key}", UserHelper.currentChurch.subDomain) + "/"}</Link></p>
            </div>
        </div>
    );
}
