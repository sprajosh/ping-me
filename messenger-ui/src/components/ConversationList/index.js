import React, { useEffect } from "react";
import { connect } from "react-redux";
import ConversationSearch from "../ConversationSearch";
import ConversationListItem from "../ConversationListItem";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import { getConversations } from "../../store/actions/Messages";

import "./ConversationList.css";

localStorage.setItem("userId", 1);
localStorage.setItem("chatId", 1);

function ConversationList({ getConversations, conversations }) {
  useEffect(() => {
    getConversations();
  }, []);

  return (
      <div className="conversation-list">
      <Toolbar
        title="Messenger"
        leftItems={[<ToolbarButton key="cog" icon="ion-ios-cog" />]}
        rightItems={[
          <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />,
        ]}
      />
      <ConversationSearch />
      {conversations && conversations.map(conversation => (
        <ConversationListItem key={conversation.id} data={conversation} />
      ))}
    </div>
  );
}

function mapStateToProp(state){
  return {
    conversations: state.message.rooms,
  }
}

export default connect(mapStateToProp, { getConversations })(ConversationList);
