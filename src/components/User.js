import React, { Component } from 'react';
import './User.css';

class User extends Component {

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    })
  }

  handleSignIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }

  handleSignOut() {
    this.props.firebase.auth().signOut();
  }

  render() {
    return (
      <div>
        <p id='user-display'>{this.props.userState}</p>
        <button id='login' onClick={this.handleSignIn}>Login</button>
        <button id='logout' onClick={this.handleSignOut}>Logout</button>
      </div>
    )
  }
}

export default User
