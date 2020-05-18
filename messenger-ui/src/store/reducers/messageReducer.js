import { GET_MESSAGES, GET_ROOMS, SET_CHAT_ID } from "../actions/actionTypes";

const initialState = {
  rooms: [],
  messages: [],
  currentChatId: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages: [...action.payload],
      };
    case GET_ROOMS:
      return {
        ...state,
        rooms: [...action.payload],
      };
    case SET_CHAT_ID:
      return {
        ...state,
        currentChatId: action.chatId
      }
    default:
      return state;
  }
};
