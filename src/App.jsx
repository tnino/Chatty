import React, { Component } from 'react';
import Navbar from './Navbar.jsx'
import Messagelist from './Messagelist.jsx'
import Chatbar from './Chatbar.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Anonymous' },
      messages: [],
      clientCount: 0
    };
  }
  //received mesages 
  onReceivedMessage = (event) => {
    console.log('this works?', event.data);
    const parseMessage = JSON.parse(event.data);
    if (parseMessage.type === 'clientCount') {
      console.log(this)
      this.handleClientCount(parseMessage.payload)
    }
    else {
      const messages = this.state.messages.concat(parseMessage);
      this.setState({ messages: messages })
    }
  }
  //counts
  handleClientCount = (data) => {
    console.log("hsdbgdihd");
    this.setState({
      clientCount: data.count
    })
  }
  //message is sent to all users.
  addNewMessage = (newMessage) => {
    let chat = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content: newMessage
    }
    this.socket.send(JSON.stringify(chat))
  }
  //username change
  addNewUsername = (newUsername) => {
    let user = {
      name: newUsername
    }
    let userA = this.state.currentUser.name
    let userB = newUsername
    let notification = {
      type: "postNotification",
      content: userA + " changed their name to " + userB
    }
    this.setState({ currentUser: user })
    this.socket.send(JSON.stringify(notification))
    console.log(this.state.currentUser.name)
  }
  handleSubmit(event) {
    console.log('username: ' + this.state.currentUser);
    event.preventDefault();
  }
  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = function (event) {
      console.log("Connected to server");
    };
    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = { id: 3, username: "Michelle", content: "Hello there!" };
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 3000);
    this.socket.onmessage = this.onReceivedMessage;
  }
  render() {
    return (
      <div>
        <Navbar clientCount={this.state.clientCount} />
        <Messagelist messages={this.state.messages} />
        <Chatbar chat={this.addNewMessage} user={this.addNewUsername} currentUser={this.state.currentUser} />
      </div>
    )
  }
}

export default App;
