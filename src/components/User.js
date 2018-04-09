import React, { Component } from 'react';
import "./user.css";

class Username extends Component {

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider ); 
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }

  setButton() {
    if(this.props.displayName === "Guest") {
      return(
        <button type="button" onClick={() => this.signIn()}>Sign in</button>
      )
    }
    else {
      return(
        <button type="button" onClick={() => this.signOut()}>Sign out</button>
      )
    }
  }

  render() {
    return(
      <section className="user">
        <h4 className="display-name">{this.props.displayName}</h4>
        <form className="signin">
          {this.setButton()}
        </form>
      </section>
    );
  }
}

export default Username;