import React, {Component} from 'react';
import PropTypes from 'prop-types';

import * as d3 from 'd3';

import styles from './CharacterFrequency.scss';


class CharacterFrequency extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('mounting');
  }

  componentWillReceiveProps(nextProps) {
    console.log('receiving props');
    console.log('prev:', this.props.data);
    console.log('next:', nextProps.data);
    if (this.props.data !== nextProps.data) {
      this.renderChart(nextProps.data);
    }
  }

  shouldComponentUpdate(nextProps) {
    console.log('should we update');
    return false;
  }

  componentWillUnmount() {
    console.log('unmounting');
  }

  renderChart(data) {
    console.log('rendering chart');

    let svg = d3.select("svg"),
      margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

    let x = d3.scaleBand().rangeRound([0, width]),//.padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);

    let g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    x.domain(data.map(function(d) { return d.letter; }));
    y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

    g.append("g")
        .attr("class", [styles.axis, styles.xAxis].join(' '))
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    g.append("g")
      .attr("class", [styles.axis, styles.yAxis].join(' '))
      .call(d3.axisLeft(y).ticks(10, '%'));

    let bars = g.selectAll(`.${styles.bar}`)
      .data(data);

    bars
      .enter().append("rect")
      .attr("class", styles.bar)
      .attr("x", function(d) { return x(d.letter); })
      .attr("width", x.bandwidth())
      .merge(bars)
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); });

    bars.exit().remove();
  }

  render() {
    return (
      <svg
        ref={svg => this.svg = svg}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}

CharacterFrequency.propTypes = {};

export default CharacterFrequency;
