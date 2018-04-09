import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';


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
  constructor(props) {
    super(props);

    this.state = {
      showCreateRoom: false,
      activeRoomName: "TEST",
      activeRoomKey: "",
      user: {displayName: "Guest"}
    }
  }

  setActiveRoom(room) {
    this.setState({activeRoomName: room.name, activeRoomKey: room.key});
  }

  setUser(user) {
    if(user === null) {
      user = {displayName: "Guest"};
    }
    this.setState({user: user})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat</h1>
          <User
            firebase={firebase}
            setUser={(user) => this.setUser(user)}
            displayName={this.state.user.displayName}
          />
        </header>
        <RoomList 
          firebase={firebase} 
          setActiveRoom={(room) => this.setActiveRoom(room)}
          activeRoomName={this.state.activeRoomName}
          activeRoomKey={this.state.activeRoomKey}
        />
        <MessageList
            firebase={firebase} 
            activeRoomName={this.state.activeRoomName}
            activeRoomKey={this.state.activeRoomKey}
            displayName={this.state.user.displayName}
          />
      </div>
    );
  }
}

export default App;
