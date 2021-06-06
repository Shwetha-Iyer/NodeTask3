import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
export default function Accountactivate(props){
    let [status,setStatus]=useState("");
    let history = useHistory();
    useEffect(()=>{
        async function fetchdata(token){
            let check = await fetch(`https://nodetask3-backend.herokuapp.com/activateaccount/${token}`,{
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                }
            });
            if(check.status===200)
            setStatus("200");
            else
            setStatus(check.status.toString());
        }
        fetchdata(props.match.params.token);
    },[props.match.params.token]);
    return<>
        {
            status === ""? <div> Please Wait loading....</div>:
            status !== "200"? <div> Hmm looks like this account is already activated</div> : history.push("/login")
        }

    </>
}
