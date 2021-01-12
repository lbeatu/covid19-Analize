//regressions.js
import regression from 'regression';
export const calculateRegression = (formattedData) => {
  let regressionData = [];
  regressionData = formattedData.map((x) => {
    return [parseFloat(x[0]), x[1]];
  });
  console.log('object', regressionData);

  const result = regression.linear(regressionData);
  const gradient = result.equation[0];
  const yIntercept = result.equation[1];
  const prediction = result.predict(2020);
  regressionData = result.points.map((el) => {
    return {
      x: el[0],
      y: el[1],
    };
  });
  return { regressionData, gradient, yIntercept, prediction };
};
export { calculateRegression as default };
