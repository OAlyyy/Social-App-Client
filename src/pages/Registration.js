import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import MyHeader from "../Components/MyHeader"
import { useHistory } from "react-router-dom";

function Registration() {

  const history = useHistory();
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data)=> {

    axios.post("http://localhost:3001/auth", data).then(() => { // add to data base , we need axioms library btw
    history.push("/login");
  });
  };
  return (
    <>
    <MyHeader/>
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label> Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. John123...)"
          />

          <label> Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autocomplete= "off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="Your Password ..."
          />

          <button type="submit"> Register </button>
        </Form>
      </Formik>
    </div>
 
    </>
    ); 
}

export default Registration;
