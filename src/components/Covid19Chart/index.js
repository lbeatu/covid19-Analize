import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import PropTypes from 'prop-types';
import React from 'react';
import { Chart, ChartCanvas } from 'react-stockcharts';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { CrossHairCursor, MouseCoordinateX, MouseCoordinateY } from 'react-stockcharts/lib/coordinates';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { CircleMarker, LineSeries, ScatterSeries, SquareMarker, TriangleMarker } from 'react-stockcharts/lib/series';
import { OHLCTooltip } from 'react-stockcharts/lib/tooltip';
import { last } from 'react-stockcharts/lib/utils';
import './style.scss';

class Covid19Chart extends React.Component {
  render() {
    const { data: initialData, type, width, ratio } = this.props;
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor((d) => d.date);
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(initialData);
    console.log('🚀 ~ file: index.js ~ line 20 ~ Covid19Chart ~ render ~ data', data);
    const xExtents = [xAccessor(last(data)), xAccessor(data[data.length - 20])];
    // eslint-disable-next-line no-unused-expressions
    const datas = data.map(({ close, date, high, low, idx, AAPLClose }) => {
      // eslint-disable-next-line no-sequences
      return { close: close, date: date, high: high, low: low, idx: idx, AAPLClose: AAPLClose };
    });
    /* {
  "date": "2007-01-02T22:00:00.000Z",
  "open": 29.91,
  "high": 30.25,
  "low": 29.4,
  "close": 29.86,
  "volume": 76935100,
  "SP500Close": 1416.6,
  "AAPLClose": 11.97,
  "GEClose": 37.97,
  "idx": {
    "index": 0,
    "level": 12,
    "date": "2007-01-02T22:00:00.000Z"
  }
}*/
    return (
      <ChartCanvas ratio={ratio} width={width} height={400} margin={{ left: 70, right: 70, top: 20, bottom: 30 }} type={type} pointsPerPxThreshold={1} seriesName="MSFT" data={datas} xAccessor={xAccessor} displayXAccessor={displayXAccessor} xScale={xScale} xExtents={xExtents}>
        <Chart id={1} yExtents={(d) => [d.high, d.low, d.AAPLClose, d.GEClose]}>
          <XAxis axisAt="bottom" orient="bottom" />
          <YAxis
            axisAt="right"
            orient="right"
            // tickInterval={5}
            // tickValues={[40, 60]}
            ticks={5}
          />
          <MouseCoordinateX at="bottom" orient="bottom" displayFormat={timeFormat('%Y-%m-%d')} />
          <MouseCoordinateY at="right" orient="right" displayFormat={format('.2f')} />

          <LineSeries yAccessor={(d) => d.AAPLClose} stroke="#ff7f0e" strokeDasharray="Dot" />
          <ScatterSeries yAccessor={(d) => d.AAPLClose} marker={SquareMarker} markerProps={{ width: 6, stroke: '#ff7f0e', fill: '#ff7f0e' }} />
          <LineSeries yAccessor={(d) => d.GEClose} stroke="#2ca02c" />
          <ScatterSeries yAccessor={(d) => d.GEClose} marker={TriangleMarker} markerProps={{ width: 8, stroke: '#2ca02c', fill: '#2ca02c' }} />
          <LineSeries yAccessor={(d) => d.close} strokeDasharray="LongDash" />
          <ScatterSeries yAccessor={(d) => d.close} marker={CircleMarker} markerProps={{ r: 3 }} />
          <OHLCTooltip forChart={1} origin={[-40, 0]} />
        </Chart>

        <CrossHairCursor />
      </ChartCanvas>
    );
  }
}

Covid19Chart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['svg', 'hybrid']).isRequired,
};

Covid19Chart.defaultProps = {
  type: 'svg',
};
Covid19Chart = fitWidth(Covid19Chart);

export default Covid19Chart;
