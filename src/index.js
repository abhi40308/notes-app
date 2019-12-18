import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA3Vrc94aAfCb92BpPkNGY-gU35tUmxESc",
    authDomain: "notes-app-ee90e.firebaseapp.com",
    databaseURL: "https://notes-app-ee90e.firebaseio.com",
    projectId: "notes-app-ee90e",
    storageBucket: "notes-app-ee90e.appspot.com",
    messagingSenderId: "1030239379543",
    appId: "1:1030239379543:web:055665d3aae86c31294312"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig); 

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
