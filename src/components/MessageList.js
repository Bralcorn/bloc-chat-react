import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state ={
      messages: [],
      messageInput: "",
      username: "TEST username"
    }

    this.messagesRef = this.props.firebase.database().ref('messages');

  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      console.log(message);
      this.setState({messages: this.state.messages.concat(message)});
    });
  }

  updateMessage(e) {
    this.setState({messageInput: e.target.value});
  }

  resetMessage() {
    this.setState({messageInput: ""});
  }

  addMessage() {
    if(this.state.messageInput != "") {      
      console.log(this.state.messages);
      this.messagesRef.push({
        username: this.state.username,
        content: this.state.messageInput,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        roomId: this.props.activeRoomKey
      });
      this.resetMessage();
    };
  }

  messageFilter() {
    this.state.messages
      .filter((message) => message.roomId === this.props.activeRoomKey)
      .map((message, index) => {
        <p>TEST</p>
      })
  }

  render() {
    return (
      <section className="message-list">
        <h2>{this.props.activeRoomName}</h2>
        <div className="message-container">
          {
            this.state.messages
              .filter(message => message.roomId === this.props.activeRoomKey)
              .map((message, index) => 
                <div key={index} className="message-container">
                  <h4>{message.username}:</h4>
                  <p>{message.content}</p>
                </div>
              )
          }
          <form>
            <input type="text" className="message-input" value={this.state.messageInput} onChange={(e)=>this.updateMessage(e)}/>
            <button type="button" onClick={() => this.addMessage()}>SEND</button>
          </form>
        </div>
      </section>
    )
  }
}

export default MessageList;