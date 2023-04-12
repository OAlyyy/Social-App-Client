import React from 'react'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import{ Link } from "react-router-dom";
import MyHeader from "../Components/MyHeader"

function PageNotFound() {
  return (
    <>
    <MyHeader/>
      <div>
      <h1> Page Not Found <SentimentVeryDissatisfiedIcon/> </h1> 
      <h3>  
        Go to :<Link to="/"> Home Page </Link>
      </h3>
    </div>
    </>
  
  )
}

export default PageNotFound
