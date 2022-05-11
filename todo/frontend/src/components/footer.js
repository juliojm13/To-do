import React from 'react';

const FooterItem = ({link}) => {
    return(
        <li>
            {link.name}
        </li>
    )
}

const Footer = ({footer_links}) => {
    return (
        <ul>
            {footer_links.map((link)=> <FooterItem link = {link} />)}
        </ul>
    )
}

export default Footer