import React, { useState } from 'react';
import { connect } from 'react-redux';
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
function AppDropdown({options, initialMessage = 'Find by Region', theme, action, selected}) {

    const [submenuVisible, setSubmenuVisible] = useState(false);
    const optionsRegions = options || ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

    const toggling = () => {
        setSubmenuVisible(!submenuVisible);
    }

    const handleOnMouseEnter = () => {
        setSubmenuVisible(true);
    }

    const handleOnMouseLeave = () => {
        setSubmenuVisible(false);
    }

    const handleClear = () => {
        action();
        setSubmenuVisible(false);
    }

    const handleSelectedOption = (option) => () => {
        action(option);
        setSubmenuVisible(false);
    }

    return (
        <div className="dropdown-container">
            <div
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                onClick={toggling}
                className={`dropdown-selected ${theme}`}>
                    { selected ? selected : initialMessage }<FontAwesomeIcon icon={faChevronDown} />
            </div>
            <div
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                className="divider">
            </div>
            {submenuVisible && (<div onMouseEnter={handleOnMouseEnter}onMouseLeave={handleOnMouseLeave} className={`dropdown-options ${theme}`}>
                {optionsRegions.map((option, index) => (
                    <div key={index} onClick={handleSelectedOption(option)} className="dropdown-single-option">{ option }</div>
                    ))}
                {selected && <div onClick={handleClear} className="dropdown-single-option-right">Clear</div>}
            </div>)}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        theme: state.entities.themes.activeTheme,
    }
}


export default connect(mapStateToProps)(AppDropdown);
