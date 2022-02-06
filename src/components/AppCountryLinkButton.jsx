import React, { useEffect } from 'react';
import config from '../config/config.json'
import { AppLinkButton } from './AppLinkButton.jsx'
import http from '../services/httpService.js'
import { connect } from 'react-redux'

function AppCountryLinkButton({ countryCode, theme, action }) {

    const [isLoading, setIsLoading] = React.useState(true);
    const [country, setCountry] = React.useState(null);
    const buttonClass = ['btn', 'button-medium', theme];

    useEffect(() => {
        const { countriesBaseURL, singleCountryEndpoint } = config;
        setIsLoading(true);
        http.get(`${countriesBaseURL}${singleCountryEndpoint}${countryCode}`)
            .then(response =>  {
                setCountry(response.data[0]);
                setIsLoading(false)
            })
            .then(() => console.log(country))
            .catch(error => console.log(error));
        return () => {
            setIsLoading(false);
            setCountry(null);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countryCode]);

    return (
        <div className={`country-button-link-container ${theme}`}>
            {!isLoading && country && <AppLinkButton action={action} buttonClass={buttonClass} icon={false} go={`/${country.cca3.toLowerCase()}`} text={country.name.common}/>}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        theme: state.entities.themes.activeTheme,
    }
}


export default connect(mapStateToProps)(AppCountryLinkButton);
