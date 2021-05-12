import React from "react";
import { DisplayBox, Permissions, EnvironmentHelper, ConfigHelper, ApiHelper } from "."
import { Link } from "react-router-dom"

interface Props { updatedFunction?: () => void }

export const External: React.FC<Props> = (props) => {

    const getChurchEditSetting = () => {
        if (Permissions.accessApi.settings.edit) {
            const jwt = ApiHelper.getConfig("AccessApi").jwt;
            const url = `${EnvironmentHelper.AccountsApp}/login?jwt=${jwt}&returnUrl=/churches/${ConfigHelper.current.churchId}/manage`;
            return (<tr><td><a href={url}><i className="fas fa-edit" /> Customize Appearance / Edit Users</a></td></tr>);
        }
        else return null;
    }

    const getMainSite = () => {
        return (<tr><td><Link to={"/"}><i className="fas fa-video" /> View Site</Link></td></tr>);
    }

    return (
        <DisplayBox headerIcon="fas fa-external-link-alt" headerText="External Resources" editContent={false} >
            <table className="table table-sm">
                <tbody>
                    {getMainSite()}
                    {getChurchEditSetting()}
                </tbody>
            </table>
        </DisplayBox>
    );
}
