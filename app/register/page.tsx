"use client"
import { FormEvent, useState } from "react"

export default function Register(){
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const submit = async (e) => {
        e.preventDefault()
        console.log(username)
        let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/register`,{
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
         return response.json()
     }
    return (
        <div>
            <form action="" onSubmit={submit}>
              <input type="text" placeholder="username" onChange={e=>setUserName(e.target.value)}/>
              <input type="password" placeholder="password" onChange={e=> setPassword(e.target.value)} />
              <button type="submit" >Register</button>

            </form>
            
        </div>
    )
    
}