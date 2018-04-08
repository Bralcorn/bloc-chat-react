import React, { Component } from 'react';
import "./RoomList.css";

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms:[],
      showCreateRoom: false,
      room: "",
    }

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }
  
  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({rooms: this.state.rooms.concat( room ) });
    });
  }

  toggleCreateRoom() {
    var toggle = !this.state.showCreateRoom;
    this.setState({showCreateRoom: toggle});
  }

  updateRoom(e) {
    this.setState({room: e.target.value});
  }

  resetRoom() {
    this.setState({room: ""});
    this.toggleCreateRoom();
  }

  addRoom() {
    this.roomsRef.push({
      name: this.state.room
    });
    this.resetRoom();
  }

  createRoom() {
    if(this.state.showCreateRoom) {
      return (
        <form className="pop-up-form">
            <h4>Create a room!</h4>
            <p>Enter name here</p>
            <input type="text" name="room" value={this.state.room} onChange={(e) => this.updateRoom(e)}/>
            <div>
              <button type="button" onClick={() => this.addRoom()}>
                Create
              </button>
              <button onClick={() => this.resetRoom()}>
                Cancel
              </button>
            </div>
        </form>
      )
    }
  }

  handleClick(room) {
    this.props.setActiveRoom(room);
  }

  handleRoomClass(room) {
    if(room.name === this.props.activeRoomName && room.key === this.props.activeRoomKey) {
      return "active-room";
    }
    else {
      return "room";
    }
  }

  render() {
    return (
      <section className="room-list">
        <button onClick={() => this.toggleCreateRoom()}>
        +
        </button>
        <nav>
        {  
          this.state.rooms.map((room, index) => 
            <div key={index} className={this.handleRoomClass(room)} onClick={() => this.handleClick(room)}>{room.name}</div>
          )
        }
        </nav>

        <div>
          {this.createRoom()}
        </div>
      </section>
    )
  }

}

export default RoomList;