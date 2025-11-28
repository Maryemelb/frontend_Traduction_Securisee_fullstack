"use client"
import Link from "next/link"
import { redirect, RedirectType } from "next/navigation"
import { useState } from "react"

export default function Login(){
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [loading, setLoading] = useState(false);
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
         if(response.ok){
            redirect('/translate', RedirectType.replace)
         }
         if (!response.ok){
            alert(data.detail|| "Operation Failed")
            throw new Error(data.detail || "Operation Failed"); 
         }
         return data
     }
    return (
        
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

        <div className="relative z-0 w-full max-w-md rounded-3xl border border-white/20 bg-white/60 p-8 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-black/40">
            <h2 className="mb-6 text-center text-3xl font-bold text-foreground">
                Welcome Back
            </h2>

            <form onSubmit={submit} className="flex flex-col gap-4">
                <div className="group relative rounded-xl bg-white/50 p-1 shadow-sm transition-all focus-within:ring-2 focus-within:ring-indigo-500/20 dark:bg-black/20">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full rounded-lg border-0 bg-transparent p-3 text-foreground placeholder-zinc-400 focus:outline-none focus:ring-0"
                        onChange={(e) => setUserName(e.target.value)}
                        onFocus={() => setIsPasswordFocused(false)}
                    />
                </div>

                <div className="group relative rounded-xl bg-white/50 p-1 shadow-sm transition-all focus-within:ring-2 focus-within:ring-indigo-500/20 dark:bg-black/20">
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full rounded-lg border-0 bg-transparent p-3 text-foreground placeholder-zinc-400 focus:outline-none focus:ring-0"
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Log In"}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                Don't have an account?{" "}
                <Link href="/register" className="font-bold text-indigo-600 hover:underline dark:text-indigo-400">
                    Sign up
                </Link>
            </p>
        </div>

        
    </div>
    )
    
    }
