import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (


<div className="message">
 <strong>{this.props.message.username}</strong>{this.props.message.content}
  
 </div>   
    );
  }
}
export default Message ;