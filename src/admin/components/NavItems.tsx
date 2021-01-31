import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { UserHelper } from "."
import { Permissions } from "./"

interface Props { prefix?: String }

export const NavItems: React.FC<Props> = (props) => {

    const location = useLocation()

    const getSelected = (): string => {
        var url = location.pathname;
        var result = "people";
        if (url.indexOf("/groups") > -1) result = "groups";
        if (url.indexOf("/attendance") > -1) result = "attendance";
        if (url.indexOf("/donations") > -1) result = "donations";
        if (url.indexOf("/forms") > -1) result = "forms";
        if (url.indexOf("/settings") > -1) result = "settings";
        return result;
    }

    const getClass = (sectionName: string): string => {
        if (sectionName === getSelected()) return "nav-link active";
        else return "nav-link";
    }

    const getTab = (key: string, url: string, icon: string, label: string) => {
        return (<li key={key} className="nav-item" id={(props.prefix || "") + key + "Tab"}><Link className={getClass(key)} to={url}><i className={icon}></i> {label}</Link></li>);
    }

    const getTabs = () => {
        var tabs = [];
        if (UserHelper.checkAccess(Permissions.streamingLiveApi.settings.edit)) tabs.push(getTab("settings", "/admin/settings", "fas fa-video", "Settings"));
        if (UserHelper.checkAccess(Permissions.streamingLiveApi.pages.edit)) tabs.push(getTab("pages", "/admin/pages", "fas fa-code", "Pages"));
        if (UserHelper.checkAccess(Permissions.accessApi.roleMembers.edit)) tabs.push(getTab("users", "/admin/users", "fas fa-user", "Users"));
        //tabs.push(getTab("traffic", "/traffic", "fas fa-chart-area", "Traffic"));
        //tabs.push(getTab("support", "mailto:support@streaminglive.church", "fas fa-envelope", "Support"));
        return tabs;
    }

    return (<>{getTabs()}</>);
}
