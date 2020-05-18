import React, {useEffect} from 'react';
import './Compose.css';
import WebSocketInstance from '../../websocket'

const handleKeyPress = e => {
  if (e.key === 'Enter') {
    let text = e.target.value
    console.log(text)
    let chatId = localStorage.getItem('chatId')
    let from =  localStorage.getItem('userId')

    WebSocketInstance.newChatMessage({
      from: from,
      message: text,
      chatId: chatId
    })
  }
}

export default function Compose(props) {

  return (
      <div className="compose">
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message, @name"
          onKeyPress={e => handleKeyPress(e)}
        />

        {
          props.rightItems
        }
      </div>
    );
}