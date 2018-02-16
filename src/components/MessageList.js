import React, { Component } from 'react';
import './MessageList.css';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: ''
    };
    this.createMessage = this.createMessage.bind(this);
    this.storeInput = this.storeInput.bind(this);
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({messages: this.state.messages.concat(message)});
    });
  }

  createMessage(event) {
    event.preventDefault();
    this.messagesRef.push({
      username: this.props.userState.displayName,
      content: this.state.newMessage,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomID: this.props.activeRoomID
    });
    this.setState({newMessage: ''});
  }

  storeInput(e) {
    const newValue = e.target.value;
    this.setState({newMessage: newValue});
  }

  render() {
    return(
      <div id='messages'>
        <h2>{this.props.activeRoomName}</h2>
        <ul id='message-list'>
          {this.state.messages.map((id, index) => {
            if (id.roomID === this.props.activeRoomID) {
              return (
                <li key={index} className='message'>
                  <div className='message'>
                    <h3 className='username'>{id.username}</h3>
                    <p className='sentAt'>{id.sentAt}</p>
                    <p className='content'>{id.content}</p>
                  </div>
                </li>
              )
            }
          })}
        </ul>
        <form id='message-form' onSubmit={this.createMessage}>
          <input type='text' id='newMessage' onChange={this.storeInput}/>
          <input type='submit'/>
        </form>
      </div>
    )
  }
}

export default MessageList
