import React from 'react';
import ReactDOM from 'react-dom';
import Scale from './scale';
import { CMAJOR, ScaleNode, neighbors, isEqual, buildKeyWheel } from './util';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: new ScaleNode(),
      notes: CMAJOR
    };
  }

  componentWillMount() {
    const start = buildKeyWheel(this.state.start);
  }

  // renderChildren() {
  //   const ScaleComponents = [];
  //   let currentNode = this.state.start;
  //   let center
  //   ScaleComponents.push(<Scale notes={this.state.notes} center={}/>)
  //   while (ScaleComponents.length < 36) {
  //
  //   }
  // }

  render() {
    return (
      <div>
        <Scale start={this.state.start} center={{ x: 600, y: 400}} />
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<Root />, root);
});
