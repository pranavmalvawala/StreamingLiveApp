import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { UserHelper } from ".";
import { Permissions } from "./";
import { Icon } from "@mui/material";

interface Props { prefix?: String }

export const NavItems = ({ prefix }: Props) => {

  const location = useLocation()

  const getSelected = (): string => {
    let url = location.pathname;
    let result = "settings";
    if (url.indexOf("/pages") > -1) result = "pages";
    return result;
  }

  const getClass = (sectionName: string): string => {
    if (sectionName === getSelected()) return prefix === "main" ? "nav-link active" : "active";
    else return prefix === "main" ? "nav-link" : "";
  }

  const getTab = (key: string, url: string, icon: string, label: string) => {
    if (url.indexOf("://") > -1) return (<li key={key} className="nav-item" id={(prefix || "") + key + "Tab"}><a className={getClass(key)} href={url}><Icon sx={{marginRight: "5px"}}>{icon}</Icon>{label}</a></li>);
    return (<li key={key} className="nav-item" id={(prefix || "") + key + "Tab"}><Link className={getClass(key)} to={url}><Icon sx={{marginRight: "5px"}}>{icon}</Icon>{label}</Link></li>);
  }

  const getTabs = () => {
    let tabs = [];
    if (UserHelper.checkAccess(Permissions.streamingLiveApi.settings.edit)) tabs.push(getTab("settings", "/admin/settings", "videocam", "Settings"));
    return tabs;
  }

  return (<>{getTabs()}</>);
}
