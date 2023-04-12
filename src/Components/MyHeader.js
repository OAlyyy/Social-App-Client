import React from 'react'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; 
import axios from "axios";


function MyHeader() {

    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
        status: false,
      });

      const history = useHistory();


    useEffect(() => {
        axios
          .get("http://localhost:3001/auth/auth", {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          })
          .then((response) => {
            if (response.data.error) {
              setAuthState((prevState) => ({
                ...prevState,
                status: false,
              }));
            } else {
              setAuthState({
                username: response.data.username,
                id: response.data.id,
                status: true,
              });
            }
          });
      }, []);


      useEffect(()=>{
      },[])

      const logout =() => {
        localStorage.removeItem("accessToken");
       setAuthState({ username: "", id: 0, status: false });
       history.push("/login");
     }; 


   
  return ( 
      
    <div className="navbar">
    <div className="links">
      {!localStorage.getItem("accessToken") ? (
        <>
          <Link to="/login"> Login</Link>
          <Link to="/registration"> Registration</Link>
        </>
      ) : ( <>
      <Link to="/"> Home Page</Link>
      <Link to="/createpost"> Create A Post</Link>
        </>
      )}
    </div>
    <div className="loggedInContainer">
      <h1>{authState.username} </h1>
      {authState.status && <button onClick={logout}> Logout</button>}
    </div> 
    </div>    
  )
}

export default  MyHeader
