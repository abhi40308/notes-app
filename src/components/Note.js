import React, { Component } from "react";
import * as firebase from "firebase";

export class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update_mode: false,
      title: props.note.title,
      tag: props.note.tag,
      note: props.note.note
    };

    this.getDateTime = this.getDateTime.bind(this);
  }

  // Function to remove note from database
  removeNote(id) {
    firebase
      .database()
      .ref("notes")
      .child(id)
      .remove();
  }

  // change update_mode to on, which will show the update form in UI
  updateNote() {
    this.setState({
      update_mode: true
    });
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

  // update the note stored in firebase database
  updateDbNote(id) {
    if (this.state.title !== "" && this.state.note !== "") {
      firebase
        .database()
        .ref("notes")
        .child(id)
        .update({
          title: this.state.title,
          note: this.state.note,
          tag: this.state.tag
        })
        .then(
          this.setState({
            update_mode: false
          })
        );
    }
  }

  render() {
    if (this.state.update_mode) {
      return (
        <section className="noteform">
          <div className="note" key={this.props.note.id}>
            <div className="note-title">
              <div className="form-group">
                <input
                  type="text"
                  id="noteform-title"
                  name="noteform-title"
                  value={this.state.title}
                  onChange={evt => this.onChangeHandler(evt, "title")}
                />
              </div>
            </div>
            <div className="note-content">
              <div className="form-group">
                <label htmlFor="noteform-tag">Tag</label>
                <input
                  type="text"
                  id="noteform-tag"
                  name="noteform-tag"
                  value={this.state.tag}
                  onChange={evt => this.onChangeHandler(evt, "tag")}
                />
                <div className="form-group">
                  <label htmlFor="noteform-note">Note</label>
                  <textarea
                    name="noteform-note"
                    id="noteform-note"
                    value={this.state.note}
                    onChange={evt => this.onChangeHandler(evt, "note")}
                  ></textarea>
                </div>
              </div>
              <button onClick={() => this.updateDbNote(this.props.note.id)}>
                Update Note
              </button>
            </div>
          </div>
        </section>
      );
    } else {
      return (
        <div className="note" key={this.props.note.id}>
          <div className="note-title">
            <h3>{this.props.note.title}</h3>
            <div className="move-right">
              <span className="update" onClick={() => this.updateNote()}>
                &Delta; &nbsp;
              </span>
              <span
                className="remove"
                onClick={() => this.removeNote(this.props.note.id)}
              >
                x &nbsp;
              </span>
            </div>
          </div>
          <div className="note-content">
            <p>
              <strong>Created At:</strong> {this.props.note.created_at}
            </p>
            <p>
              {" "}
              <strong> Tag:</strong> {this.props.note.tag}
            </p>
            <p>
              {" "}
              <strong> Note:</strong> {this.props.note.note}
            </p>
          </div>
        </div>
      );
    }
  }
}

export default Note;
