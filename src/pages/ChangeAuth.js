import React, { useState } from "react";
import axios from  "axios";
import {useHistory } from "react-router-dom";
import MyHeader from "../Components/MyHeader"

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

let history = useHistory();

  const changePassword = () => {
    axios 
      .put(
        "https://social-app-oalyyy.herokuapp.com/auth/changeauth",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        }
        else{history.push("/login"); }
      });
  };

  return (
    <>
      <MyHeader/>
  <div>
      <h1>Change Your Password</h1>
      <input
        type="text"
        placeholder="Old Password..."
        onChange={(event) => {
          setOldPassword(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="New Password..."
        onChange={(event) => {
          setNewPassword(event.target.value);
        }}
      />
      <button onClick={changePassword}> Save Changes</button>
    </div>
    </>
  );
}

export default ChangePassword;
