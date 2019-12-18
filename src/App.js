import React, { Component } from "react";
import * as firebase from "firebase";

import Header from "./components/Header";
import NotesForm from "./components/NotesForm";
import Notes from "./components/Notes";

class App extends Component {
  constructor() {
    super();

    this.state = {
      notes: []
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
      // let note = {
      //   id: snapshot.key,
      //   title: snapshot.val().title,
      //   note: snapshot.val().note,
      //   tag: snapshot.val().tag,
      // };

      let notes = this.state.notes;
      
      // notes = notes.filter(note => note.id !== snapshot.key);
      let index = notes.findIndex(note => note.id === snapshot.key);
      // console.log(index);
      // notes.splice(index, 1);
      notes[index].title = snapshot.val().title;
      notes[index].note = snapshot.val().note;
      notes[index].tag = snapshot.val().tag;

      // notes.push(note);

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

  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <NotesForm />
          <Notes notes={this.state.notes} />
        </main>
      </div>
    );
  }
}

export default App;
