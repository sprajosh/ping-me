import React from "react";
import Messenger from "../Messenger";
import Login from "./Login";
import { Provider } from "react-redux";
import store from "../../store";

export default function App() {
  const isLoggedIn = true;
  return (
    <Provider store={store}>
      <div className="App">{isLoggedIn ? <Messenger /> : <Login />}</div>
    </Provider>
  );
}
