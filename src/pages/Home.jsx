import React, { Component } from 'react';
import AppSearchInput from '../components/AppSearchInput';
import AppDropdown from '../components/AppDropdown';
import { connect } from 'react-redux';
import { loadCountries } from '../store/countries.js';
import AppCard from '../components/AppCard';
import http from '../services/httpService';

class Home extends Component {

    state = {
        countriesByRegion: [],
        selectedRegion: '',
        nameSearchResult: []
    }

    componentDidMount() {
        const { loadCountries } = this.props;
        loadCountries();
    }

    onSelectRegion = (region) => {
        if (region) {
            this.setState({
                selectedRegion: region,
            });
            const countriesByRegion = this.props.countries.filter(country => country.region === region);
            return this.setState({ countriesByRegion });
        }
        return this.setState({ countriesByRegion: [], selectedRegion: '' });

    }

    doSearch = (evt) => {
        var searchText = evt.target.value;
        if(!searchText) return this.setState({ nameSearchResult: [] });
        if(this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            http.get(`https://restcountries.com/v3.1/name/${searchText}`)
            .then(response => {this.setState({nameSearchResult: response.data})})
            .catch(error => this.setState({nameSearchResult: []}));
      }, 500);
    }

  render() {
    const { theme, countries} = this.props;
    const { countriesByRegion, nameSearchResult } = this.state;

    let countriesToDisplay = countriesByRegion.length > 0 ? countriesByRegion : countries;
    countriesToDisplay = nameSearchResult.length > 0 ? nameSearchResult : countriesToDisplay;

    return (
        <div className={`home-container ${theme}`}>
            <div className="home-controls-container">
                <AppSearchInput actionOnChange={this.doSearch} />
                {countriesToDisplay.length > 0 && <AppDropdown selected={this.state.selectedRegion} action={this.onSelectRegion} options={[...new Set(this.props.countries.map(country => country.region))]} />}
            </div>
            {countriesToDisplay.length === 0 && <div className="home-loading">Loading...</div>}
            <div className="countries-cards-container">
                {countriesToDisplay.length > 0 && countriesToDisplay.map((country) => <AppCard country={country} go={country.cca3.toLowerCase()} />)}
            </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        theme: state.entities.themes.activeTheme,
        countries: state.entities.countries.list,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadCountries: () => dispatch(loadCountries()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
