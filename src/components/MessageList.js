import React, { Component } from 'react';
import "./MessageList.css";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state ={
      messages: [],
      messageInput: "",
    }

    this.messagesRef = this.props.firebase.database().ref('messages');

  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({messages: this.state.messages.concat(message)});
    });
  }

  updateMessage(e) {
    this.setState({messageInput: e.target.value});
  }

  resetMessage() {
    this.setState({messageInput: ""});
  }

  addMessage(e) {
    e.preventDefault();
    if(this.state.messageInput !== "") {      
      this.messagesRef.push({
        username: this.props.displayName,
        content: this.state.messageInput,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        roomId: this.props.activeRoomKey
      });
      this.resetMessage();
    };
  }

  handleDate(stamp) {
    var theDate = new Date(stamp);
    var dateString = theDate.toUTCString();
    console.log(theDate);
    return(dateString);

  }

  render() {
    return (
      <section className="message-list">

        <div className="message-container">
          {
            this.state.messages
              .filter(message => message.roomId === this.props.activeRoomKey)
              .map((message, index) => 
                <div key={index} className="message-container">
                  <h4 className="message-user">{message.username}:</h4>
                  <div className="date">{this.handleDate(message.sentAt)}</div>
                  <p className="message">{message.content}</p>
                </div>
              )
          }
        </div>
        <form className="input-form" onSubmit={(e) => this.addMessage(e)}>
          <div className="stretch">
            <input type="text" 
              placeholder="Type message here" 
              className="message-input" 
              value={this.state.messageInput} 
              onChange={(e)=>this.updateMessage(e)}/>
          </div>
          <div className ="normal">
            <button className="message-submit" type="submit" >SEND</button>
          </div>
        </form>
      </section>
    )
  }
}

export default MessageList;