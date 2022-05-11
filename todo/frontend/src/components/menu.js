import React from 'react';

const MenuItem = ({menu}) => {
    return(
        <li>
            {menu.name}
        </li>
    )
}

const Menu = ({menus}) => {
    return (
        <ul>
            {menus.map((menu)=> <MenuItem menu = {menu} />)}
        </ul>
    )
}

export default Menu