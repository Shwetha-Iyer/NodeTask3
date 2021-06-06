import { useEffect, useState } from "react"

export default function Profile(props){
    let [fname,setFname]=useState("Loading data ....");
    let [lname,setLname]=useState("Loading data ....");
    let [email,setEmail]=useState("Loading data ....");
    let [account,setAccount]=useState("Loading data ....");
    let [url,setUrl]=useState(0);
    useEffect(()=>{

        async function fetchdata(id){
            let resp = await fetch(`https://nodetask3-backend.herokuapp.com/dashboard/${id}`);
            let data = await resp.json();
            console.log(data);
            if(resp.status===200){
                setFname(data.firstname);
                setLname(data.lastname);
                setEmail(data.email);
                if(data.active===1)
                setAccount("active");
                else
                setAccount("disabled");
                if(data.url)
                setUrl(data.url.length);
                else
                setUrl(0);
            }
            else{
                setFname("data unavailable");
                setLname("data unavailable");
                setEmail("data unavailable");
                setAccount("data unavailable");
            }
        }
        fetchdata(props.match.params.id);

        
    },[props.match.params.id])
    return <>
    <h1> Hello {fname}!!</h1>
    <div className="container">
        <div className="row">
            <div className="col-md-6">
                <div className="card card-info my-5">
                    <div className="card-title">
                        Profile Information
                    </div>
                    <div className="card-body">
                        <p className="p-card-text"> <b>First Name:</b>  {fname}</p>
                        <p className="p-card-text"> <b>Last Name:</b>   {lname}</p>
                        <p className="p-card-text"> <b>Email :</b>   {email}</p>
                        <p className="p-card-text"> <b>Account Status:</b>   {account}</p>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
            
                <div className="card my-5 card-count">
                    <div className="card-title">
                        Your URL's
                    </div>
                    <div className="card my-2 card-circle">
                        <h1> {url} </h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
}