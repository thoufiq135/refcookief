import "./signup.css"
import Loader from "./loder";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

import { Navigate } from "react-router-dom";
function Signup(){
    const[name,setname]=useState("")
    const[email,setemail]=useState("")
    const[pass,setpass]=useState("")
    const[warn1,setwarn1]=useState(false)
    const[warn2,setwarn2]=useState(false)
    const[turn1,setturn1]=useState(true)
    const [loading,setLloading]=useState(false)
    const [navigate,setnavigate]=useState(false)
   
    useEffect(()=>{
      async function datahandle(name,email,pass){
            console.log("name=",name)
          console.log("email=",email)  
          console.log("password=",pass)
          try{
            setLloading(true)
            const response=await fetch("http://localhost:5000/Signup",{
                method:"POST",
                body:JSON.stringify({
                    Name:name,
                    Email:email,
                    Password:pass
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const r=await response.json()
            setLloading(false)
            if(response.status===401){
                setwarn2(true)
                setnavigate(false)
            }else{
                setwarn2(false)
                setnavigate(true)
            }

          }
          catch(e){
            console.log("fetch error in signup=",e)
            setLloading(false)
            
          }
        }        
       if(email&&pass&&name){
        datahandle(name,email,pass)
       }

    },[turn1])
    function formhandle(e){
        e.preventDefault()
       console.log(name,email,pass)
       if(email,name,pass){
        setwarn1(false)
        if(turn1){
            setturn1(false)
           }else{
            setturn1(true)
           }
       }else{
        setwarn1(true)
       }
    }
    return(
        <>
        {warn1?<h4>Enter Valid Data</h4>:""}
        {warn2?<h4>Email Already Exists!</h4>:""}
        <h1>Create Account</h1>
       <form class="form" onSubmit={formhandle}>
  <input placeholder="Enter your name" className="input" type="text" onChange={(e)=>setname(e.target.value)}/>
  <input placeholder="Enter your email" className="input" type="text" onChange={(e)=>setemail(e.target.value)}/>
    <input placeholder="*********" className="input" type="password" onChange={(e)=>setpass(e.target.value)}/>

  <button onClick={formhandle}>Submit</button>
</form>
<p>Already have a account<Link to="/Login">Login</Link></p>
{loading?<Loader/>:""}
{navigate?<Navigate to="/Login"/>:""}
        </>
    )
}
export default Signup;