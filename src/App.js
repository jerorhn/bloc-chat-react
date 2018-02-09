import React, { Component } from 'react';
import RoomList from './components/RoomList';
import * as firebase from 'firebase';
import './App.css';


var config = {
    apiKey: "AIzaSyDxq1MwuIQa4uHnYQL89Gg356lTNXvSchI",
    authDomain: "bloc-chat-react-9e1e3.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-9e1e3.firebaseio.com",
    projectId: "bloc-chat-react-9e1e3",
    storageBucket: "bloc-chat-react-9e1e3.appspot.com",
    messagingSenderId: "124197904168"
  };
  firebase.initializeApp(config);


class App extends Component {
  render() {
    return (
      <div className="App">
        <RoomList
          firebase={firebase}/>
      </div>
    );
  }
}

export default App;
