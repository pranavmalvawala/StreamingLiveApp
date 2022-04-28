import React from "react";
import { Helmet } from "react-helmet"
import { ConfigHelper, ConfigurationInterface } from "../helpers";

interface Props { config?: ConfigurationInterface }

export const Theme: React.FC<Props> = (props) => {

  const defaultColors = {
    primaryColor: "#08A0CC",
    primaryContrast: "#FFFFFF",
    secondaryColor: "#FFBA1A",
    secondaryContrast: "#000000"
  }

  let css = null;
  const config = (props.config) ? props.config : ConfigHelper.current;

  if (config.keyName) {
    css = (<style type="text/css">{`
      :root { 
        --primaryColor: ${config.appearance?.primaryColor || defaultColors.primaryColor}; 
        --primaryContrast: ${config.appearance?.primaryContrast || defaultColors.primaryContrast}; 
        --secondaryColor: ${config.appearance?.secondaryColor || defaultColors.secondaryColor};
        --secondaryContrast: ${config.appearance?.secondaryContrast || defaultColors.secondaryContrast};
      }
      `}</style>);
  }

  return (<Helmet>{css}</Helmet>);
}

