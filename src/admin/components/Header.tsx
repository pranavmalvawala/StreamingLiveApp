import React from "react";
import { Link } from "react-router-dom"
import UserContext from "../../UserContext";
import { UserHelper, NavItems, ApiHelper, EnvironmentHelper } from ".";
import "../styles.css"
import { Grid } from "@mui/material";

export const Header: React.FC = () => {
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const toggleUserMenu = (e: React.MouseEvent) => { e.preventDefault(); setShowUserMenu(!showUserMenu); }
  const context = React.useContext(UserContext);

  const switchChurch = (e: React.MouseEvent) => {
    e.preventDefault();
    const jwt = ApiHelper.getConfig("StreamingLiveApi").jwt;
    const id = e.currentTarget.getAttribute("data-id");
    UserHelper.selectChurch(context, id);
    window.location.href = (EnvironmentHelper.Common.StreamingLiveRoot.replace("{key}", UserHelper.currentChurch.subDomain) + "/login?jwt=" + jwt);
  }

  const getChurchLinks = () => {
    if (UserHelper.churches.length < 2) return null;
    else {
      let result: JSX.Element[] = [];
      UserHelper.churches.forEach(c => {
        const churchName = (c.id === UserHelper.currentChurch.id) ? (<b>{c.name}</b>) : (c.name);
        result.push(<a href="about:blank" data-id={c.id} onClick={switchChurch}><i className="link"></i> {churchName}</a>);
      });
      return result;
    }
  }

  const getUserMenu = () => {
    const jwt = ApiHelper.getConfig("AccessApi").jwt;
    const profileUrl = `${EnvironmentHelper.Common.AccountsRoot}/login?jwt=${jwt}&returnUrl=/profile`;
    if (showUserMenu) return (
      <div className="container" id="userMenu">
        <div>
          <ul className="nav flex-column d-xl-none"><NavItems /></ul>
          {getChurchLinks()}
          <a href={profileUrl} target="_blank" rel="noopener noreferrer"><i className="person"></i> Profile</a>
          <a href="mailto:support@streaminglive.church"><i className="mail"></i> Support</a>
          <Link to="/logout"><i className="lock"></i> Logout</Link>
        </div>
      </div>)
    else return null;
  }

  const { firstName, lastName } = UserHelper.user;
  return (
    <>
      <div id="navbar" className="fixed-top">
        <Grid container spacing={3}>
          <Grid item md={3} xs={6}><Link className="navbar-brand" to="/"><img src="/images/logo.png" alt="logo" /></Link></Grid>
          <Grid item md={6} sx={{ display: { sm: "none", md: "block" } }}>
            <ul className="nav nav-fill">
              <NavItems prefix="main" />
            </ul>
          </Grid>
          <Grid item md={3} xs={6} sx={{ textAlign: "right", paddingTop: 17 }} id="navRight">
            <a href="about:blank" onClick={toggleUserMenu} id="userMenuLink">
              <i className="person" /> &nbsp; {firstName} {lastName} <i className="arrow_downward"></i>
            </a>
          </Grid>
        </Grid>
        {getUserMenu()}
      </div>
      <div id="navSpacer"></div>
    </>
  );
}
