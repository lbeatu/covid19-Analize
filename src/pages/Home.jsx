import React, { useState } from 'react';
import { Country, Regression, Search } from '../components';
export const Home = () => {
  const [state, setstate] = useState({regression:"",age:""})
  return (
    <div>
      <Search />
      <Country />
     <Regression
          regression={state.regression}
          data={state.age}
     />
    </div>
  );
};

export default Home;
