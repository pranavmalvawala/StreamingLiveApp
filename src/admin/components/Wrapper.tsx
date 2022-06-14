import React from "react";
import { UserHelper } from ".";
import { List } from "@mui/material";
import { Permissions } from "./"
import { SiteWrapper, NavItem } from "../../appBase/components";
import UserContext from "../../UserContext";

interface Props { pageTitle?: string, children: React.ReactNode }

export const Wrapper: React.FC<Props> = props => {
  const context = React.useContext(UserContext);

  const tabs = []
  if (UserHelper.checkAccess(Permissions.streamingLiveApi.settings.edit)) tabs.push(<NavItem url="/admin/settings" label="Settings" icon="live_tv" />);
  const navContent = <><List component="nav">{tabs}</List></>

  return <SiteWrapper navContent={navContent} context={context}>{props.children}</SiteWrapper>
};
