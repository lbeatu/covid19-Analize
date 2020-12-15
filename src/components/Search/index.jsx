import { Select } from 'antd';
import React, { useContext, useEffect } from 'react';
import { Countries } from '../../constants/countries';
import CovidContext from '../../context/covid19API/covidContext';
import './style.scss';

export const Search = () => {
  const covidContext = useContext(CovidContext);
  const { getCountries, countries, searchCountry } = covidContext;
  useEffect(() => {
    getCountries();
    searchCountry();
  }, []);
  return (
    <div>
      <Select showSearch style={{ width: 200 }} size="large" placeholder="Ülke seçiniz" onChange={(e) => searchCountry(e)} optionFilterProp="children" filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
        {countries.map((country) => (
          <Select.Option key={country.ISO2} value={country.ISO2}>
            {Countries.some((x) => x.ISO2 === country.ISO2) ? Countries.find((x) => x.ISO2 === country.ISO2).country : country.Country}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default Search;
