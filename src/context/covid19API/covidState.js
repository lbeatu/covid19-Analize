import axios from 'axios';
import React, { useReducer } from 'react';
import { GET_ALLDATA, GET_COUNTRIES, SEARCH_COUNTRIES, SET_LOADING } from '../types';
import CovidContext from './covidContext';
import CovidReducer from './covidReducer';

const GithubState = (props) => {
  const initialState = {
    countries: [],
    country: {},
    allDataByCountry: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(CovidReducer, initialState);

  // Search Countries of covid-19 api
  const searchCountry = async (CountryCode) => {
    setLoading();
    let data = [];
    const res = await axios.get(`https://api.covid19api.com/summary`);
    if (CountryCode) data = res.data.Countries.filter((x) => x.CountryCode === CountryCode)[0];
    else data = res.data.Global;
    dispatch({
      type: SEARCH_COUNTRIES,
      payload: data,
    });
  };
  // Search Countries of covid-19 api
  const getCountries = async () => {
    setLoading();
    var config = {
      method: 'get',
      url: 'https://api.covid19api.com/countries',
      headers: {},
    };

    axios(config)
      .then(function (response) {
        dispatch({
          type: GET_COUNTRIES,
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getAllDataByCountry = (Slug) => {
    axios
      .get(`https://api.covid19api.com/country/${Slug}?from=2020-02-01T00:00:00Z&to=2020-12-15T00:00:00Z`)
      .then(function (response) {
        console.log('asdasf', response.data);
        dispatch({
          type: GET_ALLDATA,
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <CovidContext.Provider
      value={{
        countries: state.countries,
        country: state.country,
        loading: state.loading,
        allDataByCountry: state.allDataByCountry,
        searchCountry,
        getCountries,
        getAllDataByCountry,
      }}
    >
      {props.children}
    </CovidContext.Provider>
  );
};
export default GithubState;
