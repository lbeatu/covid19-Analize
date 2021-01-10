import React from 'react';
import { useHistory } from 'react-router-dom';
import Covid1914home from '../assets/resources/covid1914home.jpg';
import Covid1914help from '../assets/resources/covid19help.jpg';
export const CoronaHelp = () => {
  const history = useHistory();
  console.log('history', history.location.pathname);
  return <div>{history.location.pathname === '/corona-help' ? <img className="help-img" src={Covid1914help} /> : <img className="help-img" src={Covid1914home} />}</div>;
};

export default CoronaHelp;
