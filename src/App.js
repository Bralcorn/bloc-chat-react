import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList.js';

var config = {
  apiKey: "AIzaSyCeQdlDEfPQUCVnj-YQKJ_65oVHG5K-UxI",
  authDomain: "bloc-chat-react-c9630.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-c9630.firebaseio.com",
  projectId: "bloc-chat-react-c9630",
  storageBucket: "bloc-chat-react-c9630.appspot.com",
  messagingSenderId: "841302305702"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat</h1>
          <RoomList firebase={firebase}/>
        </header>
        
      </div>
    );
  }
}

export default App;
