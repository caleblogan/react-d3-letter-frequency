import React, {Component} from 'react';
import PropTypes from 'prop-types';

import * as d3 from 'd3';

import CharacterFrequency from "../CharacterFrequency/CharacterFrequency";
import TextInput from "../TextInput/TextInput";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      text: 'nice',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    d3.tsv("letter_freq.tsv", function(d) {
      d.frequency = +d.frequency;
      return d;
    }, (err, data) => {
      if (err) throw err;
      this.setState({characters: data});
    });
  }

  calcLetterFrequencies(text) {
    let letterCounts = Array(26).fill(0);
    text.split('').map(l => {
      l = l.toLowerCase();
      let idx = l.charCodeAt(0) - 97;
      if (idx >= 0 || idx < 27) {
        letterCounts[idx] += 1;
      }
    });
    let letterSum = letterCounts.reduce((accum, cur) => cur + accum);
    return letterCounts.map(l => l / letterSum);
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
      console.log('chars:', characters);
      this.setState({characters});
    }
  }

  render() {
    return (
      <div>
        <h3>Heya</h3>
        <TextInput value={this.state.value} onChange={this.handleChange}/>
        <CharacterFrequency data={this.state.characters} width={700} height={450}/>
      </div>
    );
  }
}

App.propTypes = {};

export default App;
