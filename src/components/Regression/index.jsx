import React, { useState } from 'react';
import { LineSeries } from "react-vis";
import calculateRegression from "./regression";
export const Regression = ({regression,data}) => {
  let value={x:0,y:0};
    const [state, setState] = useState({})
    const renderRegression = ({regression,data}) => {
      if (regression) {
        return (
          <LineSeries
            data={calculateRegression(data).regressionData}
            color="red"
            animation={"gentle"}
            onNearestX={(value, { index }) =>
              setState({
                crosshairValues: [
                  calculateRegression(data).regressionData[index]
                ]
              })
            }
          />
        );
      }
    };
    return (<>regresyon
       {/*<div className="container1">
        <FlexibleWidthXYPlot
          height={400}
          onMouseLeave={() => setState({ crosshairValues: [] })}
        >
          <HorizontalGridLines />
          <VerticalGridLines />
          <MarkSeries
            data={data}
            animation={"gentle"}
          />
          {value ? (
            <LineSeries
              data={[{ x: value.x, y: value.y }, { x: 10, y: value.y }]}
              stroke="black"
            />
          ) : null}
          {value ? (
            <Hint value={value} >
              <div className="rv-hint__content">
                {`(Year ${value.x}, Marriages: ${value.y})`}
              </div>
            </Hint>
          ) : null}
          {renderRegression()}
          <XAxis top={0} hideTicks title="X" />
          <XAxis title="Year" tickFormat={v => v} />
          <YAxis title="Number of Marriages" />
          <Crosshair
            values={state.crosshairValues}
            style={{
              line: { backgroundColor: "red" }
            }}
          >
            <div
              className="rv-hint__content"
              style={{ backgroundColor: "red" }}
            >
              <p>
                Year:{" "}
                {state.crosshairValues[0]
                  ? state.crosshairValues[0].x
                  : []}
              </p>
              <p>
                Marriages:{" "}
                {state.crosshairValues[0]
                  ? state.crosshairValues[0].y
                  : []}
              </p>
            </div>
          </Crosshair>
        </FlexibleWidthXYPlot>
      </div>
*/}</>
          )
}

export default Regression;
