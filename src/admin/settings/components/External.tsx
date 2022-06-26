import React from "react";
import { DisplayBox, Permissions, EnvironmentHelper, ConfigHelper, ApiHelper } from "."
import { Link } from "react-router-dom"
import { Icon } from "@mui/material";

interface Props { updatedFunction?: () => void }

export const External: React.FC<Props> = (props) => {

  const getChurchEditSetting = () => {
    if (Permissions.accessApi.settings.edit) {
      const jwt = ApiHelper.getConfig("AccessApi").jwt;
      const url = `${EnvironmentHelper.Common.AccountsRoot}/login?jwt=${jwt}&returnUrl=/${ConfigHelper.current.churchId}/manage`;
      return (<tr><td><a href={url}><Icon>edit</Icon> Customize Appearance / Edit Users</a></td></tr>);
    }
    else return null;
  }

  const getMainSite = () => (<tr><td><Link to={"/"}><Icon>play_arrow</Icon> View Site</Link></td></tr>)

  return (
    <DisplayBox headerIcon="link" headerText="External Resources" editContent={false}>
      <table className="table table-sm">
        <tbody>
          {getMainSite()}
          {getChurchEditSetting()}
        </tbody>
      </table>
    </DisplayBox>
  );
}
