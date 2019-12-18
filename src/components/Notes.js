import React, { Component } from "react";
import Note from "./Note";

export class Notes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="notes-wrapper">
        <h3>Notes</h3>
        <div className="notes">
          {this.props.notes.map(note => (
            <Note note={note} key={note.id} />
          ))}
        </div>
      </section>
    );
  }
}

export default Notes;
