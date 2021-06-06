import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
export default function Signup(){
    let [logfail, setLogfail]=useState("");
    let history = useHistory();
    let formik = useFormik({
    initialValues: {
      firstname:"",
      lastname:"",
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.firstname) {
        errors.firstname = "Required";
      }
      if (!values.lastname) {
        errors.lastname = "Required";
      }
      if (!values.email) {
        errors.email = "Required";
      }
      else if(!((values.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))&&(values.email.includes(".")))){
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = "Required";
      }
      else if(!(values.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,15}$/))){
        errors.password = "Password must be atleast 8 characters, 1 Uppercase, 1 Lowercase, 1 Number, max 15 characters";
      }
      
      return errors;
    },
    onSubmit: async (values) => {
      //console.log("Final Values", values);
      let firstname = values.firstname;
      let lastname = values.lastname;
      let email = values.email;
      let password = values.password;
      let check=await fetch("https://nodetask3-backend.herokuapp.com/signup", {
        method: "POST",
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if(check.status===200){
        alert("Sign Up successful! An email has been sent. Please click on the link provided in the email to activate your account!");
        history.push("/login");
      }
     
     else{
        setLogfail("Oops Something Went wrong!");
     }
    },
  });
    return <>
        <div id="signup">
        <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
                <div id="login-column" className="col-md-6">
                    <div id="login-box" className="col-md-12">
                        <form onSubmit={formik.handleSubmit}>
                            <h3 className="text-center text-info pt-5">Sign Up</h3>
                            <div className="form-group">
                                <label htmlFor="firstname" className="text-info">First Name:</label><br/>
                                <input type="text" name="firstname" id="firstname" className="form-control" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.firstname}/>
                            </div>
                            {formik.errors.firstname && formik.touched.firstname ? (
                            <div> {formik.errors.firstname}</div>
                            ) : null}

                            <div className="form-group">
                                <label htmlFor="lastname" className="text-info">Last Name:</label><br/>
                                <input type="text" name="lastname" id="lastname" className="form-control" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.lastname}/>
                            </div>
                            {formik.errors.lastname && formik.touched.lastname ? (
                            <div> {formik.errors.lastname}</div>
                            ) : null}


                            <div className="form-group">
                                <label htmlFor="email" className="text-info">Email:</label><br/>
                                <input type="text" name="email" id="email" className="form-control" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}/>
                            </div>
                            {formik.errors.email && formik.touched.email ? (
                            <div> {formik.errors.email}</div>
                            ) : null}
                            <div className="form-group">
                                <label htmlFor="password" className="text-info">Password:</label><br/>
                                <input type="password" name="password" id="password" className="form-control" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}/>
                            </div>
                            {formik.errors.password && formik.touched.password ? (
                            <div> {formik.errors.password}</div>
                            ) : null}
                            <div className="form-group">
                                <Link to="/login" className="text-muted">Already a user?</Link><br/> <br/>
                                {
                                    logfail !=="" ? (<div> {logfail} </div> ) : null
                                }
                                <input type="submit" name="submit" className="btn btn-info btn-md" value="Sign Up"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
}