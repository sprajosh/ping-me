import React from 'react';


function clickHandler() {
    const a = 10;
}


export default function Login() {
    return (
        <div>
            <input class="input100" type="text" name="username" placeholder="Type your username" />
            <input class="input100" type="password" name="pass" placeholder="Type your password" />
            <button value="Submit" onClick={clickHandler}>Submit</button>
        </div>
    )
  }
