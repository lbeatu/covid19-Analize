import { DatePicker } from 'antd';
import moment from 'moment';
import React, { useContext } from 'react';
import CovidContext from '../../context/covid19API/covidContext';
const { RangePicker } = DatePicker;

export const DateRangePicker = () => {
  const covidContext = useContext(CovidContext);
  const { setDateRange } = covidContext;
  return <RangePicker defaultValue={[moment().add(-1, 'month'), moment()]} onChange={(value) => setDateRange([value[0].format('YYYY-MM-DD'), value[1].format('YYYY-MM-DD')])} />;
};

export default DateRangePicker;
