import React from "react";
import { Helmet } from 'react-helmet'
import { ConfigurationInterface } from "./";

interface Props { config: ConfigurationInterface }

export const Theme: React.FC<Props> = (props) => {

    const defaultColors = {
        primaryColor: "#08A0CC",
        primaryContrast: "#FFFFFF",
        secondaryColor: "#FFBA1A",
        secondaryContrast: "#000000"
    }


    let css = null;
    if (props.config.keyName) {
        css = (<style type="text/css">{`
      :root { 
        --primaryColor: ${props.config?.primaryColor || defaultColors.primaryColor}; 
        --primaryContrast: ${props.config?.primaryContrast || defaultColors.primaryContrast}; 
        --secondaryColor: ${props.config?.secondaryColor || defaultColors.secondaryColor};
        --secondaryContrast: ${props.config?.secondaryContrast || defaultColors.secondaryContrast};
      }
      `}</style>);
    }

    return (<Helmet>{css}</Helmet>);
}





