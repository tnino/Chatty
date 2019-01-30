import React, {Component} from 'react';

class Message extends Component {
  render() {
    if (this.props.message.type === 'incomingNotification') {
      return (
        <h1>{this.props.message.content}</h1>
      )
    } else {
      return (
        <div className="message">
         <strong>{this.props.message.username}&nbsp;&nbsp;&nbsp;</strong> {this.props.message.content}
         </div>   
            );
    }
   
  }
}

export default Message ;