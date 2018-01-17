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
    let i;
    d3.tsv("letter_freq.tsv", function(d) {
      d.frequency = +d.frequency;
      return d;
    }, (err, data) => {
      if (err) throw err;
      this.setState({characters: data});
      setTimeout(() => {
        this.setState((prevState, props) => {
          let newChars = [...prevState.characters];
          newChars[0] = {frequency: newChars[0].frequency + .003, letter: newChars[0].letter};
          return {characters: newChars}
        });
      }, 500);
    });
  }

  handleChange(e) {
    this.setState({text: e.target.text});
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
