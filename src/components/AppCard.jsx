import React from 'react';
import { numberWithCommas } from '../services/helpers'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

function AppCard({ country, theme, go }) {
  return (
      <Link to={go}  style={{ textDecoration: 'none' }}>
        <div className="card-container">
            <div className="card-image-container">
                <img src={country.flags.svg} alt="country flag"/>
            </div>
            <div className={`card-description-container ${theme}`}> { /** This is where we implement theme */ }
                <div className="card-title">{ country.name.common }</div>
                <div className="card-line">
                    <div className="card-line-description">Population:&nbsp;</div>
                    <div className="card-line-data"><span className="number">{ numberWithCommas(country.population) }</span></div>
                </div>
                <div className="card-line">
                    <div className="card-line-description">Region:&nbsp;</div>
                    <div className="card-line-data">{ country.region }</div>
                </div>
                <div className="card-line">
                    <div className="card-line-description">Capital:&nbsp;</div>
                    <div className="card-line-data">{ country.capital }</div>
                </div>
            </div>
        </div>
      </Link>
  );
}

const mapStateToProps = state => {
    return {
        theme: state.entities.themes.activeTheme,
    }
}


export default connect(mapStateToProps)(AppCard);
