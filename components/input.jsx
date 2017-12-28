import React from 'react';
import Chord from './chord';
import { NOTE_NAMES, EMPTY, getPegs, chordReader, updateCanvas } from './util';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [...EMPTY]
    };
  }

  toggleNote(i) {
    const notes = [...this.state.notes];
    notes[i] = !notes[i];
    this.props.handleClick(i);
    this.setState({ notes });
  }

  componentDidMount() {
    this.handleCanvas();
  }

  componentDidUpdate() {
    this.handleCanvas();
  }

  handleCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    const radius = 80;
    updateCanvas(ctx, radius, this.state.notes);
  }

  render() {
    const { notes } = this.state;
    const { rootReferenceEnabled } = this.props;
    const noteRadius = 30, scaleRadius = 80;
    const center = { x: 120, y: 300 };
    const { name: chordName, rootIdx: chordRootIdx } = chordReader(notes);
    return (
      <div>
        <button onClick={this.props.toggleRef} style={{
          position: "absolute",
          top: center.y - 140,
          left: center.x - 50,
          border: "1px solid black",
          borderRadius: "10px",
          padding: "10px"
        }}>Reference Root</button>
        {notes.map((note, i) => {
          const color = i === chordRootIdx ? "red": "black";
          let backgroundColor;
          if (note) {
            backgroundColor = "yellow";
          } else {
            backgroundColor = note ? "#AAF" : "transparent";
          }
          return (
            <div key={i}
              onClick={() => this.toggleNote(i)}
              className="input-note"
              style={{
              position: "absolute",
              width: noteRadius,
              height: noteRadius,
              borderRadius: noteRadius,
              backgroundColor: backgroundColor,
              border: `1px solid ${color}`,
              color: color,
              textAlign: "center",
              top: center.y - scaleRadius * Math.cos(Math.PI * i / 6),
              left: center.x + scaleRadius * Math.sin(Math.PI * i / 6)
            }}><span style={{
              position: "relative",
              top: "0.4em"
            }}>{ rootReferenceEnabled ? NOTE_NAMES[i] : i }</span></div>
          )
        })}
        <div style={{
          position: "absolute",
          top: center.y,
          left: center.x - 22,
          width: "80px",
          textAlign: "center"
        }}><span>{ chordName.split(" ").map(piece => {
          return (
            <p>{ piece }</p>
          );
        }) }</span>
        </div>
        <canvas ref="canvas"
          width={2 * scaleRadius}
          height={2 * scaleRadius}
          style={{
          position: "absolute",
          top: center.y - scaleRadius + noteRadius / 2,
          left: center.x - scaleRadius + noteRadius / 2
        }}/>
      </div>
    )
  }
}

export default Input;
