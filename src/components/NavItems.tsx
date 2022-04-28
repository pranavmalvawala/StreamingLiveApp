import React from "react";
import { Link } from "react-router-dom"
import { ConfigHelper, ConfigurationInterface } from "../helpers";

interface Props { config: ConfigurationInterface }

export const NavItems: React.FC<Props> = (props) => {
  let items = [];

  for (let i = 0; i < props.config.buttons?.length; i++) {
    let b = props.config.buttons[i];
    if (b.url === "/settings") {
      items.push(<li key={i} className="nav-item"><Link className="nav-link" to={b.url}>{b.text}</Link></li>);
    }
    else {
      items.push(<li key={i} className="nav-item"><a href={b.url} target="_blank" rel="noopener noreferrer" className="nav-link">{b.text}</a></li>);
    }

  }

  return (
    <>
      {items}
    </>
  );
}

