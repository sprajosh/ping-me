/*
One chat in ConversationList

Call backend and display messages for the specific chat room id
*/

import React, {useEffect} from 'react';
import shave from 'shave';
import { getMessages, setChatId } from "../../store/actions/Messages";
import { connect } from "react-redux";

import './ConversationListItem.css';

function ConversationListItem({getMessages, messages, data}) {
  useEffect(() => {
    shave('.conversation-snippet', 20);
  })

  const { photo, name, text, id } = data;

  console.log("data: ", data)

  function handleClick() {
    getMessages({id});
    setChatId(id);
    localStorage.setItem('chatId', id)
  }

  return (
    <div className="conversation-list-item" onClick={handleClick}>
      <img className="conversation-photo" src={photo} alt="conversation" />
      <div className="conversation-info">
        <h1 className="conversation-title">{ name }</h1>
        <p className="conversation-snippet">{ text }</p>
      </div>
    </div>
  );
}

const mapStateToProp = (state) => ({
  messages: state.messages,
});

export default connect(mapStateToProp, { getMessages })(ConversationListItem);
