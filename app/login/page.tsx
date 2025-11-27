"use client"
import { useState } from "react"

export default function Login(){
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const submit = async (e) => {
        e.preventDefault()
        console.log(username)
        let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/login`,{
         method:'POST',
         body:JSON.stringify({
             username: username,
             password: password
         }),
         headers: {
            "Content-Type": "application/json" 
         }})
         setUserName('')
         setPassword('')
         const data = await response.json();  // wait for the body
         console.log(data)
         localStorage.setItem('token',data)
         if (!response.ok){
            alert(data.detail|| "Operation Failed")
            throw new Error(data.detail || "Operation Failed"); 
         }
         return data
     }
    return (
        <div>
            <form action="" onSubmit={submit}>
            <input type="text" placeholder="username" onChange={e=>setUserName(e.target.value)}/>
            <input type="password" placeholder="password" onChange={e=> setPassword(e.target.value)} />
            <button type="submit" >submit</button>
            </form>
           
        </div>
    )
    
    }
