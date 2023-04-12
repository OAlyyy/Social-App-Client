import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import MyHeader from "../Components/MyHeader"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  // eslint-disable-next-line
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  let history = useHistory();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        history.push("/");
      }
    });
  };
  return (
    <>
      <MyHeader/>
      <div className="loginContainer">
        <label>Username:</label>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <button onClick={login}> Login </button>
      </div>
    </>
  );
}

export default Login;
