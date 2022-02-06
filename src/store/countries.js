import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api'
import config from '../config/config.json'


const slice = createSlice({
  name: 'countries',
  initialState: {
    list: [],
    error: [],
    loading: false,
    lastFetch: null
  },
  reducers: {
    stopCountriesLoading: (countries, action) => {
      countries.loading = false;
    },
    countriesRequested: (countries, action) => {
      countries.loading = true;
    },
    countriesReceived: (countries, action) => {
      countries.list = action.payload.data;
    },
    countryReceived: (countries, action) => {
      countries.singleCountry = action.payload.data[0];
    },
    updateError: (countries, action) => {
      countries.error = action.payload;
    }
  },
});

export default slice.reducer;


// Action Creators

const {
    countriesReceived,
    countriesRequested,
    stopCountriesLoading,
} = slice.actions;


export const loadCountries = () => {
  return apiCallBegan({
    baseURL: config.countriesBaseURL,
    url: config.allCountriesEndpoint,
    onStart: countriesRequested.type,
    onSuccess: countriesReceived.type,
    onEnd: stopCountriesLoading.type
  })
}
