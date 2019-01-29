import React, { Component } from 'react';
import Navbar from './Navbar.jsx'
import Messagelist from './Messagelist.jsx'
import Chatbar from './Chatbar.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: ''},

      messages: []
    };
  }
  onReceivedMessage = (event) => {
    console.log('this works?', event.data);
    const parseMessage = JSON.parse(event.data);
    const messages = this.state.messages.concat(parseMessage);
      this.setState({ messages: messages })
  }
  
  addNewMessage = (newMessage) => {
    let chat = {
      username: this.state.currentUser.name,
      content: newMessage

    }
    // "User username sent content"
    this.socket.send(JSON.stringify(chat))
    // this.setState({ messages: [...this.state.messages, chat] });
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
        <Navbar />
        <Messagelist messages={this.state.messages} />
        <Chatbar chat={this.addNewMessage} currentUser={this.state.currentUser} />
      </div>
    )
  }
}

export default App;
