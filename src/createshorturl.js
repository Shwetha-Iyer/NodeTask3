import { useFormik } from "formik";
import { useState } from "react";
export default function Createshorturl(props){
    let[message,setMessage]=useState("");
    let formik = useFormik({
        initialValues: {
          url: ""
        },
        validate: (values) => {
          let errors = {};
         if (!values.url) {
            errors.url = "Required";
          }          
          return errors;
        },
        onSubmit: async (values) => {
          //console.log("Final Values", values);
          let url = values.url;
          let check = await fetch(`https://nodetask3-backend.herokuapp.com/urlshorten/${props.match.params.id}`, {
            method: "POST",
            body: JSON.stringify({
              url
            }),
            headers: {
              "Content-type": "application/json",
            },
          });
          let data = await check.json();
          if(check.status===200){
          console.log(data.shorturl);
          setMessage("Success");
          }
         else{
            setMessage("Failed");
         }
        },
      });
    return <>
    <h1> Create your Short URL</h1>

    <div className="container">
        <div className="row">
            <div className="col-sm-12">
                <div className="card card-count my-5">
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="url" className="text-dark"><h5>URL:</h5></label>
                        <input type="text" className="form-control" name="url" id="url" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}/> <br/> 
                        {formik.errors.url && formik.touched.url ? (
                            <div> {formik.errors.url}</div>
                            ) : null}
    
                        <input type="submit" name="submit" className="btn btn-dark" value="Go"/>

                        {
                            message ==="Success"? (<div> URL has been created! Go to My URL's to see full information!</div>):
                            message !==""? <div> Oops! Something went wrong! Try again later!</div> : <div></div>
                        }
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
}