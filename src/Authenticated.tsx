import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ProfilePage } from "./components";
import { Home } from "./Home"
import { Logout } from "./Logout";
import { SettingsPage } from './admin/settings/SettingsPage'
import { FileLoader } from "./appBase/pageComponents"

interface Props { location: any }

export const Authenticated: React.FC<Props> = (props) => {
    return (
        <Switch>
            <Route path="/files/pages/:id" render={(props) => (
                <FileLoader id={props.match.params.id} api="StreamingLiveApi" fileType="text/html" />
            )} />
            <Route path="/admin/settings"><SettingsPage /></Route>
            <Route path="/profile"><ProfilePage /></Route>
            <Route path="/login"><Redirect to="/" /></Route>
            <Route path="/forgot"  ><Redirect to="/" /></Route>
            <Route path="/logout"><Logout /></Route>
            <Route path="/"><Home /></Route>

        </Switch>
    );
}

