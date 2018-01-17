import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Container, Divider, Grid, Header } from 'semantic-ui-react'

import * as d3 from 'd3';

import CharacterFrequency from "../CharacterFrequency/CharacterFrequency";
import TextInput from "../TextInput/TextInput";

import styles from './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      text: 'nice',
      width: 700,
      height: 450
    };
    this.maxWidth = 1127;
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    d3.tsv("letter_freq.tsv", function(d) {
      d.frequency = +d.frequency;
      return d;
    }, (err, data) => {
      if (err) throw err;
      this.setState({
        characters: data,
        width: window.innerWidth > this.maxWidth ? this.maxWidth : window.innerWidth
      });
    });
  }

  calcLetterFrequencies(text) {
    let letterCounts = Array(26).fill(0);
    text.split('').map(l => {
      l = l.toLowerCase();
      let idx = l.charCodeAt(0) - 97;
      if (idx >= 0 && idx < 27) {
        letterCounts[idx] += 1;
      }
    });
    let letterSum = letterCounts.reduce((accum, cur) => cur + accum);
    return letterSum ? letterCounts.map(l => l / letterSum) : letterCounts;
  }

  handleChange(e) {
    this.setState({text: e.target.value});
    if (e.target.value) {
      let freqs = this.calcLetterFrequencies(e.target.value);
      let characters = [];
      freqs.forEach((freq, i) => {
        characters.push({
          frequency: freq,
          letter: i + 97
        })
      });
      this.setState({characters});
    }
  }

  render() {
    return (
      <Container className={styles.container}>
        <Grid centered>
          <Grid.Row>
            <Header className={styles.header} as="h1" textAlign="center">Text Frequency Analyzer</Header>
          </Grid.Row>
          <Grid.Row centered>
            <TextInput value={this.state.value} onChange={this.handleChange}/>
          </Grid.Row>
          <Grid.Row centered={true}>
            <CharacterFrequency data={this.state.characters} width={this.state.width} height={this.state.height}/>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

App.propTypes = {};

export default App;
