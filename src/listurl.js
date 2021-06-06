import { useEffect, useState } from "react"


export default function Listurl(props){
    let [url,setUrl]= useState([]);
    
    
    useEffect(()=>{
        async function fetchURL(id){
            let resp = await fetch(`https://nodetask3-backend.herokuapp.com/dashboard/${id}`);
            let data = await resp.json();
            
            if(data.url){
                if(data.url.length>0)
                setUrl([...data.url]);
                else
                setUrl([]);
            }
            else
            setUrl([]);
        }
        fetchURL(props.match.params.id)
    },[props.match.params.id]);
    let addCount = async (obj)=>{
        console.log(obj);
        setUrl(url.map(item=>{
            if(obj.s_url === item.s_url)
            item.count++;
            return item;
        }));
        let check = await fetch(`https://nodetask3-backend.herokuapp.com/updatecount/${props.match.params.id}`, {
        method: "PUT",
        body: JSON.stringify({
          s_url:obj.s_url
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      console.log(check.status);
    } 
    return <>
    <h1>List of Short URL's </h1>
    <div className="container my-5">
    {
        url.length>0?(
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        
                        <th scope="col">Original URL</th>
                        <th scope="col">Short URL</th>
                        <th scope="col">Clicks</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        
                        url.map((obj)=>{
                            return <tr key={obj.o_url}>
                                
                                <td>{obj.o_url}</td>
                                <td><a href={obj.o_url} target="_blank" rel="noreferrer" onClick={()=>{addCount(obj)}}>{obj.s_url}</a></td>
                                <td>{obj.count}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        ): <div> <h1> No URLs created yet.</h1></div>
    }
    </div>
    </>
}