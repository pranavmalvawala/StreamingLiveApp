import React from "react";
import { Link } from "react-router-dom"
import { ConfigHelper } from "../helpers";

export const NavItems = () => {
  let items = [];
  for (let i = 0; i < ConfigHelper.current.buttons?.length; i++) {
    let b = ConfigHelper.current.buttons[i];
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

