import React, { Component } from 'react';
import './MessageList.css';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({messages: this.state.messages.concat(message)});
    });
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
      </div>
    )
  }
}

export default MessageList
