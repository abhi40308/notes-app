import React, { Component } from "react";
import * as firebase from "firebase";

export class NotesForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      note: "",
      tag: ""
    };

    this.createNote = this.createNote.bind(this);
    this.getDateTime = this.getDateTime.bind(this);
  }

  // handle state change of state variables
  onChangeHandler(evt, key) {
    this.setState({
      [key]: evt.target.value
    });
  }

  // get date and time of note creation
  getDateTime() {
    let currentdate = new Date();
    let datetime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    return datetime;
  }

  // create a note in the database
  createNote() {
    if (this.state.title !== "" && this.state.note !== "") {
      firebase
        .database()
        .ref("notes")
        .push({
          title: this.state.title,
          note: this.state.note,
          tag: this.state.tag,
          created_at: this.getDateTime()
        });
    }
  }

  render() {
    return (
      <section className="noteform">
        <h3>Create New Note</h3>
        <div className="form-group">
          <label htmlFor="noteform-title">Title</label>
          <input
            type="text"
            id="noteform-title"
            name="noteform-title"
            value={this.state.title}
            onChange={evt => this.onChangeHandler(evt, "title")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="noteform-note">Note</label>
          <textarea
            name="noteform-note"
            id="noteform-note"
            value={this.state.note}
            onChange={evt => this.onChangeHandler(evt, "note")}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="noteform-tag">Tag</label>
          <input
            type="text"
            id="noteform-tag"
            name="noteform-tag"
            value={this.state.tag}
            onChange={evt => this.onChangeHandler(evt, "tag")}
          />
        </div>
        <button onClick={this.createNote}>Create Note</button>
      </section>
    );
  }
}

export default NotesForm;
