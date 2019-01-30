import React, { Component } from 'react';
import Message from './Message.jsx'

class MessageList extends Component {

    render() {
        const newMessages = this.props.messages.map((message, index) => {
            return <Message message={message} key={message.id} userColor={message.color} />
        });
         return (
           <main className="messages">
                {newMessages}
            </main>
        );
    }
}

export default MessageList;