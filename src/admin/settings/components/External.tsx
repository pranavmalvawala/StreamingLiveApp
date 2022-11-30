import React from "react";
import { DisplayBox, Permissions, EnvironmentHelper, ConfigHelper, ApiHelper } from "."
import { Link } from "react-router-dom"
import { Icon } from "@mui/material";

interface Props { updatedFunction?: () => void }

export const External: React.FC<Props> = (props) => {

  const getChurchEditSetting = () => {
    if (Permissions.membershipApi.settings.edit) {
      const jwt = ApiHelper.getConfig("MembershipApi").jwt;
      const url = `${EnvironmentHelper.Common.AccountsRoot}/login?jwt=${jwt}&returnUrl=/${ConfigHelper.current.churchId}/manage`;
      return (<tr><td><a href={url} style={{ display: "flex" }}><Icon sx={{ marginRight: "5px" }}>edit</Icon>Customize Appearance / Edit Users</a></td></tr>);
    }
    else return null;
  }

  const getMainSite = () => (<tr><td><Link to={"/"} style={{ display: "flex" }}><Icon sx={{ marginRight: "5px" }}>play_arrow</Icon>View Site</Link></td></tr>)

  return (
    <DisplayBox headerIcon="link" headerText="External Resources" editContent={false} help="accounts/appearance">
      <table className="table">
        <tbody>
          {getMainSite()}
          {getChurchEditSetting()}
        </tbody>
      </table>
    </DisplayBox>
  );
}
