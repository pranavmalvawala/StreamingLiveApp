import React from "react";
import UserContext from "./UserContext"
import { Authenticated } from "./Authenticated"
import { Unauthenticated } from "./Unauthenticated"
import { ApiHelper } from "./components"

export const Routing: React.FC = (props: any) => {
    var user = React.useContext(UserContext)?.userName; //to force rerender on login
    if (user === null || !ApiHelper.isAuthenticated) {
        return <Unauthenticated />;

    }
    else {
        return <Authenticated location="/" />;
    }
}
