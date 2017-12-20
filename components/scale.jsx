import React from 'react';
import { getCenter, keyReader } from './util';

class Scale extends React.Component {

  render() {
    const noteRadius = 16;
    const scaleRadius = 40;
    const { node, selectedNotes } = this.props
    const { rank, notes, center } = node;
    return (
      <div>
        {notes.map((note, i) => {
          let noteColor;
          if (selectedNotes.includes(i)) {
            noteColor = "yellow";
          } else {
            noteColor = note ? "#AAF" : "#eee";
          }
          return (
            <div key={i}
              onClick={() => this.props.handleClick(i)}
              style={{
              position: "absolute",
              width: noteRadius,
              height: noteRadius,
              borderRadius: noteRadius,
              backgroundColor: noteColor,
              border: "1px solid black",
              fontSize: "0.5em",
              textAlign: "center",
              top: center.y - scaleRadius * Math.cos(Math.PI * i / 6),
              left: center.x + scaleRadius * Math.sin(Math.PI * i / 6)
            }}><span style={{
              position: "relative",
              top: "0.3em"
            }}>{i}</span></div>
          )
        })}
        <div style={{
          position: "absolute",
          top: center.y - 4,
          left: center.x,
          fontSize: "12px",
          textAlign: "center"
        }}>
          {keyReader(notes).split(" ").map((piece, i) => {
            return (
              <p key={i}>{piece}</p>
            )
          })}
        </div>
      </div>
    );
  }
}

export default Scale;

//
// class Scale extends React.Component {
//   render() {
//     const center = this.props.center;
//     const noteRadius = 14;
//     const scaleRadius = 36;
//     return (
//       <div>
//         {this.props.start.notes.map((note, i) => {
//           return (
//             <div key={i}
//               style={{
//               position: "absolute",
//               width: noteRadius,
//               height: noteRadius,
//               borderRadius: noteRadius,
//               backgroundColor: note ? "#AAF": "white",
//               border: "1px solid black",
//               fontSize: "0.5em",
//               textAlign: "center",
//               top: center.y - scaleRadius * Math.cos(Math.PI * i / 6),
//               left: center.x + scaleRadius * Math.sin(Math.PI * i / 6)
//             }}><span>{i}</span></div>
//           )
//         })}
//         <div style={{
//           position: "absolute",
//           top: center.y,
//           left: center.x
//         }}>{this.props.num}</div>
//         {this.props.start.children.map((node, i) => {
//           return (
//             <Scale key={i} start={node} center={node.center} num={this.props.num + 1}/>
//           );
//         })}
//       </div>
//     )
//   }
// }
