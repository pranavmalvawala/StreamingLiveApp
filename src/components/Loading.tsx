import React from "react";
import { ConfigurationInterface } from "./";

//interface Props { config: ConfigurationInterface }

export const Loading = () => {
    //const imgSrc = props.config.logoSquare !== undefined ? (EnvironmentHelper.ContentRoot + props.config.logoSquare) : '/images/logo-login.png'
    const imgSrc = '/images/logo-login.png';
    return (
        <div className="smallCenterBlock" style={{ marginTop: 100 }} >
            <img src={imgSrc} alt="logo" className="img-fluid" style={{ marginBottom: 50 }} />
            <div className="text-center">Loading..</div>
        </div>
    )
}





