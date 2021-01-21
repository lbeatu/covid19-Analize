/* eslint-disable import/no-anonymous-default-export */
import { CLEAR_COUNTRIES, GET_ALLDATA, GET_ALLDATA_TABLE, GET_COUNTRIES, GET_COUNTRY, SEARCH_COUNTRIES, SET_DATERANGE, SET_LOADING } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_COUNTRIES:
      return {
        ...state,
        country: { ...action.payload },
        loading: true,
      };
    case CLEAR_COUNTRIES:
      return {
        ...state,
        country: [],
        loading: false,
      };

    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        loading: false,
      };
    case GET_ALLDATA:
      const data = action.payload.map(({ Active, Recovered, Deaths, Confirmed, Date: date }, index) => ({ SP500Close: Confirmed, volume: Confirmed, GEClose: Deaths, AAPLClose: Recovered, close: Active, date: new Date(date.split('T')[0]), high: Active + 0.2, low: Active - 0.2, idx: { index: index, date: new Date(date.split('T')[0]), level: 12 } }));
      return {
        ...state,
        allDataByCountry: data,
        loading: false,
      };
    case GET_COUNTRY:
      return {
        ...state,
        countries: action.payload,
        loading: false,
      };
    case GET_ALLDATA_TABLE:
      return {
        ...state,
        allDataByCountryForTable: action.payload,
        loading: false,
      };
    case SET_DATERANGE:
      return {
        ...state,
        dateRange: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
