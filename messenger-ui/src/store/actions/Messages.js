import { GET_MESSAGES, GET_ROOMS, SET_CHAT_ID } from "./actionTypes";
import axios from "axios";
import ListMessage from '../../ListMessage';

var userId = localStorage.getItem("userId");

const HOST_URL = "http://127.0.0.1:8000";

export const getConversations = () => async (dispatch) => {
  try {

    axios.get(`${HOST_URL}/chat/?userId=${userId}`).then((response) => {
      let newConversations = response.data.messages.map((result) => {
        let gender = ["men", "women"][Math.floor(Math.random() * 2)];
        let img_num = Math.floor(Math.random() * 100);

        return {
          photo: `https://randomuser.me/api/portraits/${gender}/${img_num}.jpg`,
          name: `${result.name}`,
          text: `${result.text}`,
          id: `${result.id}`,
        };
      });
        dispatch({
        type: GET_ROOMS,
        payload: newConversations,
      });
    });
  } catch (err) {
    console.error(err);
  }
};


export const getMessages = id => async (dispatch) => {
  try {
    axios.get(`${HOST_URL}/messages/?chatRoom=${id}`).then((response) => {
      console.log(response.data)
      let messages = response.data.messages.map((result) => {
        return {
          id: `${result.id}`,
          text: `${result.text}`,
          timestamp: `${result.timestamp}`,
        };
      });
      dispatch({
        type: GET_MESSAGES,
        payload: newConversations,
      });
    });
  } catch (err) {
    console.error(err);
  }
};


export const setChatId = chatId => async (dispatch) => {
  dispatch({
    type: SET_CHAT_ID,
    id: chatId
  })
};
