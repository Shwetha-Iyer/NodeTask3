import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";

export default function Reset(props){
    let [logfail, setLogfail]=useState("");
    let [form,setForm]=useState(-1);
    let history = useHistory();
    let formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: (values) => {
      let errors = {};
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
       let password = values.password;
      let check = await fetch(`https://nodetask3-backend.herokuapp.com/resetpwd/${props.match.params.token}`, {
        method: "PUT",
        body: JSON.stringify({
          password
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if(check.status===200){
          alert("Password has been reset successfully!");
        history.push("/");
      }
      else{
        setLogfail("Something went wrong!");
      }
    },
  });
  
    useEffect(()=>{
        // call the api
        async function fetchdata(token){
          let check = await fetch(`https://nodetask3-backend.herokuapp.com/resetpwdcheck/${token}`);
      if(check.status===200)
      setForm(check.status);
      else{
          setForm(404);
      }
      }
        fetchdata(props.match.params.token);    
    },[props.match.params.token]);
    return <>
    {
        form ===-1 ? <h1> Page Loading .....</h1> :
        (form === 200 ? 
            <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
                <div id="login-column" className="col-md-6">
                    <div id="login-box" className="col-md-12">
                        <form onSubmit={formik.handleSubmit}>
                            <h3 className="text-center text-info pt-5">Reset Password</h3>
                            <div className="form-group">
                                <label htmlFor="password" className="text-info">Password:</label><br/>
                                <input type="password" name="password" id="password" className="form-control" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}/>
                            </div>
                            {formik.errors.password && formik.touched.password ? (
                            <div> {formik.errors.password}</div>
                            ) : null}
                           {
                                logfail !=="" ? (<div> {logfail} </div> ) : null
                            }
                            <div className="form-group">
                    
                                <input type="submit" name="submit" className="btn btn-info btn-md" value="Submit"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
            
            : <h1>Hmm... looks like you have already changed the password</h1>)
    }
    </>
}