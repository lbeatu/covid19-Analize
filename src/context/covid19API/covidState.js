import axios from 'axios';
import moment from 'moment';
import React, { useReducer } from 'react';
import { GET_ALLDATA, GET_COUNTRIES, SEARCH_COUNTRIES, SET_DATERANGE, SET_LOADING } from '../types';
import CovidContext from './covidContext';
import CovidReducer from './covidReducer';

const CovidState = (props) => {
  const initialState = {
    dateRange: [moment().add(-1, 'month').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
    countries: [],
    country: {},
    allDataByCountry: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(CovidReducer, initialState);

  // Search Countries of covid-19 api
  const searchCountry = async (CountryCode) => {
    try {
      setLoading();
      let data = [];
      const res = await axios.get(`https://api.covid19api.com/summary`);
      if (CountryCode) data = res.data.Countries.filter((x) => x.CountryCode === CountryCode)[0];
      else data = res.data.Global;
      dispatch({
        type: SEARCH_COUNTRIES,
        payload: data,
      });
    } catch (error) {
      console.log('🚀 ~ file: covidState.js ~ line 45 ~ searchCountry ~ error', error);
    }
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
    console.log('state.dateRange', state.dateRange[0]);
    axios
      .get(`https://api.covid19api.com/country/${Slug}?from=${state.dateRange[0]}T00:00:00Z&to=${state.dateRange[1]}T00:00:00Z`)
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
  const setDateRange = (dateRange) => {
    dispatch({
      type: SET_DATERANGE,
      payload: dateRange,
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
        dateRange: state.dateRange,
        searchCountry,
        getCountries,
        getAllDataByCountry,
        setDateRange,
      }}
    >
      {props.children}
    </CovidContext.Provider>
  );
};
export default CovidState;
