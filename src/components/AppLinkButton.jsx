import React from 'react';
import { Link }  from 'react-router-dom';
import { faArrowLeft, faHome } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AppLinkButton = ({ buttonClass, text, icon, type, go, action }) => {

    const selectIcon = (type) => {
        switch (type) {
            case 'back':
                return faArrowLeft;
            default:
                return faHome;
        }
    }

    return (
        <Link onClick={() => action(go)} to={go}  style={{textDecoration: "none", marginLeft: '10px'}}>
            <button className={buttonClass.join(' ')}>
                {icon && <FontAwesomeIcon icon={selectIcon(type)} />}
                {console.log('GO',go)}
                <span className={icon ? 'with-icon' : ''}>{text}</span>
            </button>
        </Link>
    );
};
