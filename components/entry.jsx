import React from 'react';
import ReactDOM from 'react-dom';
import Scale from './scale';
import Input from './input';
import { ScaleNode, buildKeyWheel, pegsToNotes, notesToPegs, CMAJOR, EMPTY } from './util';

class Root extends React.Component {
  constructor(props) {
    super(props);
    const start = new ScaleNode(pegsToNotes([0,2,4,5,7,9,11]), { x: 720, y: 350 });
    this.state = {
      scales: buildKeyWheel(start),
      selected: [...EMPTY]
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    const selected = [...this.state.selected];
    selected[i] = !selected[i];
    this.setState({ selected });
  }

  render() {
    const { selected, scales } = this.state;
    const pegs = notesToPegs(selected);
    return (
      <div>
        <Input handleClick={this.handleClick} />
        <div style={{
          width: "80%"
        }}>
          {scales.map((node, i) => {
            let isMatch = true;
            pegs.forEach(i => {
              if (!node.notes[i]) isMatch = false;
            });
            let selectedNotes = isMatch ? selected: [];
            return (
              <Scale key={i} node={node} selectedNotes={selectedNotes} handleClick={this.handleClick}/>
            )
          })}
        </div>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<Root />, root);
});
