import React, { useState } from 'react';
import { Crosshair, FlexibleWidthXYPlot, HorizontalGridLines, LineSeries, MarkSeries, VerticalGridLines, XAxis, YAxis } from 'react-vis';
import calculateRegression from './regression';
export const Regression = ({ regression, data }) => {
  const [state, setState] = useState({ crosshairValues: [] });
  return (
    <>
      <FlexibleWidthXYPlot height={400} onMouseLeave={() => setState({ crosshairValues: [] })}>
        <HorizontalGridLines />
        <VerticalGridLines />
        <MarkSeries data={data.map((e) => ({ x: e[0], y: e[1] }))} animation={'gentle'} />
        <LineSeries
          data={calculateRegression(data).regressionData}
          color="red"
          animation={'gentle'}
          onNearestX={(value, { index }) => {
            console.log('calculateRegression(data).regressionData[index]', calculateRegression(data).regressionData[index]);
            setState({
              crosshairValues: [calculateRegression(data).regressionData[index]],
            });
          }}
        />
        {console.log('data', data, regression, calculateRegression(data), calculateRegression(data).regressionData)}
        <XAxis title="Date" tickFormat={(v) => v / 1000} />
        <YAxis title="Vaka sayıları" />
        <Crosshair
          values={state.crosshairValues}
          style={{
            line: { backgroundColor: 'red' },
          }}
        >
          <div className="rv-hint__content" style={{ backgroundColor: 'red' }}>
            <p>Year: {state.crosshairValues[0] ? state.crosshairValues[0].x : []}</p>
            <p>Marriages: {state.crosshairValues[0] ? state.crosshairValues[0].y : []}</p>
          </div>
        </Crosshair>
      </FlexibleWidthXYPlot>
    </>
  );
};

export default Regression;
