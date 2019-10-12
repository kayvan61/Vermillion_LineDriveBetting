import React from "react";
import * as d3 from "d3";

var tempData = [{
    'x': 1,
    'y': 5
  }, {
    'x': 20,
    'y': 20
  }, {
    'x': 40,
    'y': 10
  }, {
    'x': 60,
    'y': 40
  }, {
    'x': 80,
    'y': 5
  }, {
    'x': 100,
    'y': 60
  }];

class LineGraph extends React.Component{
  componentDidMount() {
    var vis = d3.select("#visualisation");
    var WIDTH = 1000;
    var HEIGHT = 500;
    var MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    };
    var xRange = d3.scaleLinear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(tempData, function (d) {
        return d.x;
      }),
      d3.max(tempData, function (d) {
        return d.x;
      })
    ]);

    var yRange = d3.scaleLinear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(tempData, function (d) {
        return d.y;
      }),
      d3.max(tempData, function (d) {
        return d.y;
      })
    ]);

    var xAxis = d3.axisBottom()
      .scale(xRange)
        .tickSize(5);

    var yAxis = d3.axisLeft()
      .scale(yRange)
        .tickSize(5);

    vis.append("svg:g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
      .call(xAxis);

    vis.append("svg:g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + (MARGINS.left) + ",0)")
      .call(yAxis);

    var lineFunc = d3.line()
    .x(function (d) {
      return xRange(d.x);
    })
    .y(function (d) {
      return yRange(d.y);
    })

   vis.append("svg:path")
    .attr("d", lineFunc(tempData))
    .attr("stroke", "blue")
    .attr("stroke-width", 2)
    .attr("fill", "none");
  }

  render() {
    return (<svg id="visualisation" width="1000" height="500"></svg>);
  }
}

export default LineGraph; 