import React from "react";
import { DisplayBox, UserHelper, Permissions, EnvironmentHelper, ConfigHelper } from "."
import { Link } from "react-router-dom"

interface Props { updatedFunction?: () => void }

export const External: React.FC<Props> = (props) => {

    const getAppearance = () => {
        if (Permissions.accessApi.settings.edit) {
            const url = EnvironmentHelper.AccountsApp + "/churches/" + ConfigHelper.current.churchId + "/manage";
            return (<tr><td><a href={url}><i className="fas fa-palette" /> Customize Appearance</a></td></tr>);
        }
        else return null;
    }

    const getPermissions = () => {
        if (Permissions.accessApi.roleMembers.edit) {
            const url = EnvironmentHelper.AccountsApp + "/churches/" + ConfigHelper.current.churchId + "/StreamingLive";
            return (<tr><td><a href={url}><i className="fas fa-user" /> Edit Users</a></td></tr>);
        }
        else return null;
    }

    const getMainSite = () => {
        return (<tr><td><Link to={"/"}><i className="fas fa-video" /> View Site</Link></td></tr>);
    }

    //

    return (
        <DisplayBox headerIcon="fas fa-external-link-alt" headerText="External Resources" editContent={false} >
            <table className="table table-sm">
                <tbody>
                    {getMainSite()}
                    {getAppearance()}
                    {getPermissions()}
                </tbody>
            </table>
        </DisplayBox>
    );
}
