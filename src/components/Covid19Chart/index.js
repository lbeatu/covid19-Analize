import { Button, Col, PageHeader, Row, Tag } from 'antd';
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import PropTypes from 'prop-types';
import React from 'react';
import { Chart, ChartCanvas } from 'react-stockcharts';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { ema } from 'react-stockcharts/lib/indicator';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { CircleMarker, LineSeries, ScatterSeries, SquareMarker, TriangleMarker } from 'react-stockcharts/lib/series';
import { HoverTooltip, OHLCTooltip } from 'react-stockcharts/lib/tooltip';
import { last } from 'react-stockcharts/lib/utils';
import CovidContext from '../../context/covid19API/covidContext';
import { DateRangePicker } from '../DateRangePicker';
import './style.scss';

class Covid19Chart extends React.Component {
  static contextType = CovidContext;

  render() {
    const { data: initialData, type, width, ratio } = this.props;
    const { country, getAllDataByCountry } = this.context;
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor((d) => d.date);
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(initialData);
    const xExtents = [xAccessor(last(data)), xAccessor(data[data.length - 20])];
    // eslint-disable-next-line no-unused-expressions
    const datas = data.map(({ close, date, high, low, idx, AAPLClose }) => {
      // eslint-disable-next-line no-sequences
      return { close: close, date: date, high: high, low: low, idx: idx, AAPLClose: AAPLClose };
    });
    const dateFormat = timeFormat('%Y-%m-%d');
    const numberFormat = format('3.0f');
    const ema20 = ema()
      .id(0)
      .options({ windowSize: 0 })
      .merge((d, c) => {
        d.ema20 = c;
      })
      .accessor((d) => d.ema20);

    const ema50 = ema()
      .id(2)
      .options({ windowSize: 0 })
      .merge((d, c) => {
        d.ema50 = c;
      })
      .accessor((d) => d.ema50);

    function tooltipContent(ys) {
      return ({ currentItem, xAccessor }) => {
        return {
          x: dateFormat(xAccessor(currentItem)),
          y: [
            {
              label: 'Vaka sayısı',
              value: currentItem.close && numberFormat(currentItem.close),
            },
            {
              label: 'İyileşen hasta sayısı',
              value: currentItem.AAPLClose && numberFormat(currentItem.AAPLClose),
            },
          ].filter((line) => line.value),
        };
      };
    }
    return (
      <Row>
        <Col sm={24}>
          <PageHeader
            ghost={false}
            title="Günlük Vaka Analizi"
            subTitle={
              <div>
                <Tag color="orange">20.01.12</Tag>
                <Tag color="red">{'state.AAPLClose'}</Tag>
                <Tag color="blue">volcano</Tag>
              </div>
            }
            extra={[
              <Row gutter={10}>
                <Col>
                  <DateRangePicker />
                </Col>
                <Col>
                  <Button color size="middle" onClick={() => getAllDataByCountry(country.Slug)}>
                    Verileri getir
                  </Button>
                </Col>
              </Row>,
            ]}
          />
        </Col>
        <Col sm={24}>
          <ChartCanvas ratio={ratio} width={width} height={400} margin={{ left: 70, right: 70, top: 20, bottom: 30 }} type={type} pointsPerPxThreshold={1} seriesName="MSFT" data={datas} xAccessor={xAccessor} displayXAccessor={displayXAccessor} xScale={xScale} xExtents={xExtents}>
            <Chart id={1} yExtents={(d) => [d.high, d.low, d.AAPLClose, d.GEClose]}>
              <HoverTooltip
                yAccessor={ema50.accessor()}
                tooltipContent={tooltipContent([
                  {
                    label: `${ema20.type()}(${ema20.options().windowSize})`,
                    value: (d) => numberFormat(ema20.accessor()(d)),
                    stroke: ema20.stroke(),
                  },
                  {
                    label: `${ema50.type()}(${ema50.options().windowSize})`,
                    value: (d) => numberFormat(ema50.accessor()(d)),
                    stroke: ema50.stroke(),
                  },
                ])}
                fontSize={15}
              />
              <XAxis axisAt="bottom" orient="bottom" />
              <YAxis
                axisAt="right"
                orient="right"
                // tickInterval={5}
                // tickValues={[40, 60]}
                ticks={5}
              />

              <LineSeries yAccessor={(d) => d.AAPLClose} stroke="#3F8600" strokeDasharray="Dot" />
              <ScatterSeries yAccessor={(d) => d.AAPLClose} marker={SquareMarker} markerProps={{ width: 6, stroke: '#3F8600', fill: '#3F8600' }} />
              <LineSeries yAccessor={(d) => d.GEClose} stroke="#CF1322" />
              <ScatterSeries yAccessor={(d) => d.GEClose} marker={TriangleMarker} markerProps={{ width: 8, stroke: '#CF1322', fill: '#CF1322' }} />
              <LineSeries yAccessor={(d) => d.close} strokeDasharray="LongDash" />
              <ScatterSeries yAccessor={(d) => d.close} marker={CircleMarker} markerProps={{ r: 3 }} />
              <OHLCTooltip forChart={1} origin={[-40, 0]} />
            </Chart>
          </ChartCanvas>
        </Col>
      </Row>
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
