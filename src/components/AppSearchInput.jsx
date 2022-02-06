import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux'

function AppSearchInput({theme, actionOnChange}) {
  return (
    <div className={`search-input-container ${theme}`}>
        <FontAwesomeIcon icon={faSearch} />
        <input onChange={(e) => actionOnChange(e)} className={`search-input ${theme}`} type="text" placeholder="Search for a country..." />
    </div>
  );
}

const mapStateToProps = state => {
    return {
        theme: state.entities.themes.activeTheme,
    }
}

export default connect(mapStateToProps)(AppSearchInput);
