import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Login } from "./Login"
import { Forgot } from "./Forgot"
import { Home } from "./Home"

export const Unauthenticated = () => {
    return (
        <>
            <Switch>
                <Route path="/login/:token" component={Login} ></Route>
                <Route path="/login" component={Login} ></Route>
                <Route path="/forgot" component={Forgot} ></Route>
                <Route path="/admin/settings"><Redirect to="/" /></Route>
                <Route path="/admin/pages"><Redirect to="/" /></Route>
                <Route path="/admin/users"><Redirect to="/" /></Route>
                <Route path="/profile"><Redirect to="/" /></Route>
                <Route path="/"><Home /></Route>
            </Switch>
        </>
    )
}
