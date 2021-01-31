import React from "react";
import { Link } from "react-router-dom"
import { ButtonInterface } from ".";

interface Props { buttons: ButtonInterface[] }

export const NavItems: React.FC<Props> = (props) => {
    var items = [];
    for (var i = 0; i < props.buttons?.length; i++) {
        var b = props.buttons[i];
        if (b.url === "/settings") {

            items.push(<li key={i} className="nav-item" ><Link className="nav-link" to={b.url}>{b.text}</Link></li>);

        }
        else {
            items.push(<li key={i} className="nav-item" ><a href={b.url} target="_blank" rel="noopener noreferrer" className="nav-link">{b.text}</a></li>);
        }

    }



    return (
        <>
            {items}
        </>
    );
}




