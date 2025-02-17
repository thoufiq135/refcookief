import { Link } from "react-router-dom";
import "./login.css"
import Loader from "./loder";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
function Login(){
    const[email,setemail]=useState("")
    const[pass,setpass]=useState("")
    const[warn1,setwarn1]=useState(false)
    const[warn2,setwarn2]=useState(false)
    const[warn3,setwarn3]=useState(false)
    const[set,setset]=useState(false)
    const[turn1,setturn1]=useState(true)
    const [loading,setLloading]=useState(false)
    const [navigate,setnavigate]=useState(false)
    useEffect(()=>{
        console.log(email,pass)
        async function datahandle(mail,pass){
            try{
                setLloading(true)
                const response =await fetch("localhost:5000/Login",{
                    method:"POST",
                    body:JSON.stringify({
                        Email:mail,
                        Password:pass
                    }),
                    headers:{
                        "Content-Type":"application/json",

                    },
                    credentials:"include"
                })
                const r=await response.json()
                setLloading(false)
                if(response.status===401){
                    setwarn2(true)
                    setwarn3(false)
                    setset(false)
                }else if(response.status===404){
                    setwarn3(true)
                    setwarn2(false)
                    setset(false)
                }else{
                    setset(true)
                    setwarn2(false)
                    setwarn3(false)
                }

            }catch(e){
                console.log("error at fetch login😔",e)
                setLloading(false)
            }

        }
        if(email&&pass){
            datahandle(email,pass)
            setwarn1(false)
        }else{
            setwarn1(false)
        }
    },[turn1])
    function filehandle(e){
        e.preventDefault()
        if(email&&pass){
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
{warn2?<h4>User not exists</h4>:""}
{warn3?<h4 id="pass">Wrong password</h4>:""}

<form id="form1" onSubmit={filehandle}>
   <p id="form-title">Sign in to your account</p>
    <div id="input-container">
      <input type="email" placeholder="Enter email" onChange={(e)=>setemail(e.target.value)}/>
      <span>
      </span>
  </div>
  <div id="input-container">
      <input type="password" placeholder="Enter password" onChange={(e)=>setpass(e.target.value)}/>
    </div>
     <button type="submit" id="submit" onClick={filehandle}>
    Sign in
  </button>

  <p id="signup-link">
    No account?
    <Link to="/Signup">Signup</Link>
  </p>
</form>
{loading?<Loader/>:""}

{set?<Navigate to="/Blog"/>:""}
        </>
    )
}
export default Login;