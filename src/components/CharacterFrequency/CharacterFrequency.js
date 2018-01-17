import React, {Component} from 'react';
import PropTypes from 'prop-types';

import * as d3 from 'd3';

import styles from './CharacterFrequency.scss';


class CharacterFrequency extends Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && !this.margin) {
      this.setupChart(nextProps.data);
    }
    if (this.margin && this.props.data !== nextProps.data) {
      this.renderChart(nextProps.data);
    }
    let i;
  }

  shouldComponentUpdate(nextProps) {
    return false;
  }

  setupChart(data) {
    let svg = d3.select("svg");
    this.margin = {top: 20, right: 20, bottom: 30, left: 40};
    this.width = +svg.attr("width") - this.margin.left - this.margin.right;
    this.height = +svg.attr("height") - this.margin.top - this.margin.bottom;

    this.x = d3.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3.scaleLinear().rangeRound([this.height, 0]);

    this.g = svg.append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.x.domain(data.map(function(d) { return d.letter; }));
    this.y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

    this.g.append("g")
        .attr("class", [styles.axis, styles.xAxis].join(' '))
        .attr('transform', `translate(0, ${this.height})`)
        .call(d3.axisBottom(this.x));

    this.g.append("g")
      .attr("class", [styles.axis, styles.yAxis].join(' '))
      .call(d3.axisLeft(this.y).ticks(10, '%'));
  }

  renderChart(data) {
    console.log('rendering chart');

    this.y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return d.frequency; })])
      .rangeRound([this.height, 0]);

    this.g.select(`.${styles.yAxis}`)
      .transition()
      .duration(2000)
      .call(d3.axisLeft(this.y)
        .ticks(10, '%'));


    let bars = this.g.selectAll(`.${styles.bar}`)
      .data(data);

    bars
      .enter().append("rect")
        .attr("class", styles.bar)
        .attr("x", d => this.x(d.letter))
        .attr("width", this.x.bandwidth())
        .attr("y", d => this.height)
        .attr("height", d => 0)
      .merge(bars)
        .transition()
        .duration(1000)
        .attr("y", d => this.y(d.frequency))
        .attr("height", d => this.height - this.y(d.frequency));

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
