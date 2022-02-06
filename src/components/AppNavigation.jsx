import React from 'react';
import { faMoon } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connect } from 'react-redux';
import { changeActiveTheme } from '../store/themes.js'

function AppNavigation({ theme, changeActiveTheme}) {

    const handleThemeChange = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        changeActiveTheme(newTheme);
    }

  return (
    <div className={`navigation-container ${theme}`}>
        <div className="navigation-title">Where in the world?</div>
        <div onClick={handleThemeChange} className="navigation-theme-switcher">
            <FontAwesomeIcon icon={faMoon} />
            <div className="navigation-mode">
               {theme !== 'dark' ? 'Dark' : 'Light'} Mode
            </div>
        </div>
    </div>
  );
}

const mapStateToProps = state => {
    return {
        theme: state.entities.themes.activeTheme,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeActiveTheme: (theme) => dispatch(changeActiveTheme(theme)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);
