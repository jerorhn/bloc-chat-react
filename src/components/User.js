import React, { Component } from 'react';
import './User.css';

class User extends Component {
  constructor(props) {
    super(props);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
  }
  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      console.log(user);
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

  handleUserName() {
    if(this.props.userState === null) {
      return 'Guest'
    } else {
      return this.props.userState.displayName
    }
  }

  render() {
    return (
      <div>
        <p id='user-display'>{this.handleUserName()}</p>
        <button id='login' onClick={this.handleSignIn}>Login</button>
        <button id='logout' onClick={this.handleSignOut}>Logout</button>
      </div>
    )
  }
}

export default User
