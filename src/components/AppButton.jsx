import React from 'react';
import { faArrowLeft, faHome } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AppButton = ({ buttonClass, text, icon, type, action }) => {

    const selectIcon = (type) => {
        switch (type) {
            case 'back':
                return faArrowLeft;
            default:
                return faHome;
        }
    }

    return (
        <button onClick={()=> action()} className={buttonClass.join(' ')}>
            {icon && <FontAwesomeIcon icon={selectIcon(type)} />}
            <span className={icon ? 'with-icon' : ''}>{text}</span>
        </button>
    );
};
