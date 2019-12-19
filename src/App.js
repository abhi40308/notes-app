import React, { Component } from "react";
import * as firebase from "firebase";

import Header from "./components/Header";
import NotesForm from "./components/NotesForm";
import Notes from "./components/Notes";

class App extends Component {
  constructor() {
    super();

    this.state = {
      notes: [],
      filterTag: "",
      filterDate: "",
      filteredNotes: [],
      filter: false
    };
  }

  // initialise database object
  componentDidMount() {
    this.db = firebase.database();
    this.listenForChange();
  }

  // update the notes array on deletion or insertion or updation of a note
  listenForChange() {
    this.db.ref("notes").on("child_added", snapshot => {
      let note = {
        id: snapshot.key,
        title: snapshot.val().title,
        note: snapshot.val().note,
        tag: snapshot.val().tag,
        created_at: snapshot.val().created_at
      };

      let notes = this.state.notes;
      notes.push(note);

      this.setState({
        notes: notes
      });
    });

    this.db.ref("notes").on("child_changed", snapshot => {
      let notes = this.state.notes;
      let index = notes.findIndex(note => note.id === snapshot.key);
      notes[index].title = snapshot.val().title;
      notes[index].note = snapshot.val().note;
      notes[index].tag = snapshot.val().tag;

      this.setState({
        notes: notes
      });
    });

    this.db.ref("notes").on("child_removed", snapshot => {
      let notes = this.state.notes;
      notes = notes.filter(note => note.id !== snapshot.key);

      this.setState({
        notes: notes
      });
    });
  }

  onChangeHandler(evt, key) {
    this.setState({
      [key]: evt.target.value
    });
  }

  filterNoteByTag() {
    if (this.state.filterTag !== "") {
      let notes;
      if (this.state.filteredNotes.length !== 0)
        notes = this.state.filteredNotes;
      else notes = this.state.notes;
      let newNotes = notes.filter(note => note.tag === this.state.filterTag);
      this.setState({
        filteredNotes: newNotes,
        filter: true
      });
    }
  }

  filterNoteByDate() {
    if (this.state.filterDate !== "") {
      let date = this.state.filterDate;
      let yy = date.substr(0, 4);
      let mm = date.substr(5, 2);
      let dd = date.substr(8, 2);
      let newDate = dd + "/" + mm + "/" + yy;

      let notes;
      if (this.state.filteredNotes.length !== 0)
        notes = this.state.filteredNotes;
      else notes = this.state.notes;

      let newNotes = notes.filter(note => note.created_at.includes(newDate));
      this.setState({
        filteredNotes: newNotes,
        filter: true
      });
    }
  }

  clearFilters() {
    if (
      this.state.notes.length === 0 ||
      this.state.filterTag !== "" ||
      this.state.filterDate !== ""
    ) {
      this.setState({
        filteredNotes: [],
        filterTag: "",
        filterDate: "",
        filter: false
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <NotesForm />
          <hr></hr>
          <section className="noteform-filter">
            <h3>Search Notes</h3>
            <div className="form-flex">
              <span className="form-group">
                <label htmlFor="noteform-tag">Filter by Tag</label>
                &nbsp;
                <input
                  type="text"
                  id="noteform-tag"
                  name="noteform-tag"
                  value={this.state.filterTag}
                  onChange={evt => this.onChangeHandler(evt, "filterTag")}
                />
                &nbsp;
                <button onClick={() => this.filterNoteByTag()}>
                  Filter Notes
                </button>
              </span>

              <span className="form-group">
                <button onClick={() => this.clearFilters()}>
                  Clear Filters
                </button>
              </span>

              <span className="form-group">
                <label htmlFor="noteform-date">Filter by Date</label>
                &nbsp;
                <input
                  type="date"
                  id="noteform-date"
                  name="noteform-date"
                  value={this.state.filterDate}
                  onChange={evt => this.onChangeHandler(evt, "filterDate")}
                />
                &nbsp;
                <button onClick={() => this.filterNoteByDate()}>
                  Filter Notes
                </button>
              </span>
            </div>
          </section>
          {this.state.filter ? (
            <Notes notes={this.state.filteredNotes} />
          ) : (
            <Notes notes={this.state.notes} />
          )}
        </main>
      </div>
    );
  }
}

export default App;
