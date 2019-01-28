import React, { Component } from 'react';

class Chatbar extends Component {
    constructor(props) {
        super(props);
        this.state = { message: "" };
        // this.newMessages = this.newMessages.bind(this);
    }
    handleInputChange = (event) => {
        let newMessage = event.target.value
        console.log(newMessage)
        this.setState({
            content: newMessage
        })   
    }

    handleKeyPress = (event) => {
        if(event.key === "Enter"){
         this.props.chat(this.state.content)
        }
      }

    render() {
        return (
            <footer className="chatbar">
                <input defaultValue={this.props.currentUser.name} className="chatbar-username" placeholder="Your Name (Optional)"/>
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" onChange={this.handleInputChange} id="one" onKeyPress={this.handleKeyPress}/>
            </footer>
        );
    }
}
export default Chatbar;


