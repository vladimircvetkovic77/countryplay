import React, { useEffect } from 'react';
import { AppLinkButton } from '../components/AppLinkButton';
import { connect } from 'react-redux';
import http from '../services/httpService.js';
import config from '../config/config.json';
import { useParams } from "react-router-dom";
import { AppButton } from '../components/AppButton';
import { numberWithCommas, getFirstProperty, getValueOfObjectProperty } from '../services/helpers.js';
import AppCountryLinkButton from '../components/AppCountryLinkButton';
import {WrappedMap} from '../components/AppMap.jsx';

function CountryDetails({ theme  }) {

    const { countriesBaseURL, singleCountryEndpoint } = config;
    let params = useParams();
    const [country, setCountry] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isMapVisible, setIsMapVisible] = React.useState(false);
    const [location, setLocation] = React.useState(params.countryCode);

    useEffect(() => {
        window.scrollTo(0, 0)
        setIsLoading(true);
        http.get(`${countriesBaseURL}${singleCountryEndpoint}${location}`)
            .then(response =>  {
                console.log(response.data)
                setCountry(response.data[0]);
                setIsLoading(false)
            })
            .then(() => console.log(country))
            .catch(error => console.log(error));
        return () => {
            // cleanup;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const buttonClass = ['btn', 'button-large', theme];
    const buttonClassMedium = ['btn', 'button-medium', theme];

    const handleClick = () => {
        setIsMapVisible(!isMapVisible);
    }

    const defineLocation = (newLocation) => {
        console.log('NL', newLocation)
        setLocation(newLocation);
    }

    return (
            <div className={`country-details-container ${theme}`}>
                {console.log(country)}
                <AppLinkButton buttonClass={buttonClass} icon={true} type='back' text='Back' go="/" action={defineLocation} />
                <div className="country-details-content">
                    {!isLoading && <div className="country-details-flag"><img src={country.flags.svg} alt="flag" /></div>}
                    {!isLoading && (
                        <div className="country-details-numbers">
                            <div className="country-details-numbers-title">{country.name.common}</div>
                            <div className="country-details-numbers-details">
                                <div className="country-details-numbers-details-item">
                                    <div className="country-property">Native name: &nbsp;</div>
                                    {country.name && country.name.nativeName && <div>{country.name.nativeName[getFirstProperty(country.name.nativeName)].official}</div>}
                                </div>
                                <div className="country-details-numbers-details-item">
                                    <div className="country-property">Top Level Domaine: &nbsp;</div>
                                    {country.tld && <div>{Object.values(country.tld).join(", ")}</div>}
                                </div>
                                <div className="country-details-numbers-details-item">
                                    <div className="country-property">Population: &nbsp;</div>
                                    {country.population && <div>{numberWithCommas(country.population)}</div>}
                                </div>
                                <div className="country-details-numbers-details-item">
                                    <div className="country-property">Currencies: &nbsp;</div>
                                    {country.currencies && <div>{getValueOfObjectProperty(country.currencies, 'name')}</div>}
                                </div>
                                <div className="country-details-numbers-details-item">
                                    <div className="country-property">Region: &nbsp;</div>
                                    {country.region && <div>{country.region}</div>}
                                </div>
                                <div className="country-details-numbers-details-item">
                                    <div className="country-property">Languages: &nbsp;</div>
                                    {country.languages && <div>{Object.values(country.languages).join(', ')}</div>}
                                </div>
                                <div className="country-details-numbers-details-item long">
                                    <div className="country-property">Sub Region: &nbsp;</div>
                                    {country.subregion && <div>{country.subregion}</div>}
                                </div>
                                <div className="country-details-numbers-details-item long">
                                    <div className="country-property">Capital: &nbsp;</div>
                                    {country.capital && <div>{country.capital.join(', ')}</div>}
                                </div>
                                <div className="country-details-numbers-details-item long large-margin map-holder">
                                    <AppButton action={handleClick} icon={false} text="View on Map" buttonClass={buttonClassMedium}/>
                                    {isMapVisible && (
                                            <div className="map">
                                                <WrappedMap
                                                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCvO9QuMhdXmzWyAYLLXxojpLUi2tUkVqA"
                                                    loadingElement={<div style={{ height: `100%` }} />}
                                                    containerElement={<div style={{width: `100%`, height: `400px` }} />}
                                                    mapElement={<div style={{ height: `100%` }} />}
                                                    lat={country.latlng[0]}
                                                    lng={country.latlng[1]}
                                                />
                                            </div>
                                        )}
                                </div>
                                <div className="country-details-numbers-details-item long large-margin">
                                    <div className="country-property">Border Countries: &nbsp;</div>
                                    {console.log(country.borders)}
                                    <div className="bordering-countries-container">
                                        {country.borders && country.borders.map((border, index) => {
                                            return (<AppCountryLinkButton action={defineLocation} key={border} countryCode={border} />)
                                        })}
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        theme: state.entities.themes.activeTheme,
    }
}

export default connect(mapStateToProps)(CountryDetails);
