"use client"
import { stringify } from "querystring"
import { useState } from "react"

export default function Translate(){
    const [text, setText]= useState('')
    const [choice, setChoice] = useState("FR -> EN")
    const [translatedInput, setTranslatedInput] = useState('')
    const [password, setPassword] = useState("");
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitTranslate= async(e)=>{
        e.preventDefault()
        console.log(choice)
        console.log(localStorage.getItem('token'))

        let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/translate`,{
            method: 'POST',
            body: JSON.stringify({
                text: text,
                choice: choice
            }),
            headers: {
                "Content-Type": "application/json" ,
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
        console.log('start2')

        const data= await response.json()
        console.log(data[0].translation_text)
        setTranslatedInput(data[0].translation_text)
        if(! response.ok){
             alert(data.detail)
             throw new Error(data.detail)
        }
        return data;
    }
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

        <h1 className="relative mb-8 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-4xl font-extrabold text-transparent drop-shadow-sm dark:from-indigo-400 dark:to-pink-400 sm:text-5xl">
            Choose Your Translation
        </h1>

        <div className="relative z-10 mb-8 flex w-full max-w-3xl gap-6 sm:gap-10">
            {/* Option 1: FR -> EN */}
            <div
                onClick={() => setChoice("FR -> EN")}
                className={`group relative flex flex-1 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border p-6 backdrop-blur-xl transition-all duration-500 ${choice === "FR -> EN"
                        ? "scale-105 border-indigo-500/50 bg-white/60 shadow-2xl shadow-indigo-500/20 ring-4 ring-indigo-500/10 dark:bg-black/40"
                        : "scale-95 border-white/20 bg-white/30 hover:bg-white/40 dark:border-white/10 dark:bg-black/20 dark:hover:bg-black/30"
                    }`}
            >
                <div className={`text-5xl transition-all duration-500 ${choice === "FR -> EN" ? "scale-110 animate-bounce" : "grayscale filter"}`}>
                    {choice === "FR -> EN" ? "😄" : "😡"}
                </div>
                <p
                    className={`mt-4 text-lg font-bold transition-colors duration-300 ${choice === "FR -> EN" ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-500 dark:text-zinc-500"
                        }`}
                >
                    {choice === "FR -> EN" ? "Choose me!" : "No choose me"}
                </p>
                <div className="mt-2 rounded-full bg-indigo-100 px-4 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                    FR ➝ EN
                </div>
            </div>

            {/* Option 2: EN -> FR */}
            <div
                onClick={() => setChoice("EN -> FR")}
                className={`group relative flex flex-1 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border p-6 backdrop-blur-xl transition-all duration-500 ${choice === "EN -> FR"
                        ? "scale-105 border-pink-500/50 bg-white/60 shadow-2xl shadow-pink-500/20 ring-4 ring-pink-500/10 dark:bg-black/40"
                        : "scale-95 border-white/20 bg-white/30 hover:bg-white/40 dark:border-white/10 dark:bg-black/20 dark:hover:bg-black/30"
                    }`}
            >
                <div className={`text-5xl transition-all duration-500 ${choice === "EN -> FR" ? "scale-110 animate-bounce" : "grayscale filter"}`}>
                    {choice === "EN -> FR" ? "😄" : "😡"}
                </div>
                <p
                    className={`mt-4 text-lg font-bold transition-colors duration-300 ${choice === "EN -> FR" ? "text-pink-600 dark:text-pink-400" : "text-zinc-500 dark:text-zinc-500"
                        }`}
                >
                    {choice === "EN -> FR" ? "Choose me!" : "No shoose me"}
                </p>
                <div className="mt-2 rounded-full bg-pink-100 px-4 py-1 text-xs font-semibold text-pink-700 dark:bg-pink-900/50 dark:text-pink-300">
                    EN ➝ FR
                </div>
            </div>
        </div>

        <form
            onSubmit={submitTranslate}
            className="relative z-10 flex w-full max-w-5xl flex-col gap-6 lg:flex-row"
        >
            <div className="group relative flex-1 rounded-3xl bg-gradient-to-br from-white/50 to-white/30 p-1 shadow-lg backdrop-blur-md transition-all duration-300 focus-within:shadow-xl focus-within:ring-2 focus-within:ring-indigo-500/20 dark:from-black/40 dark:to-black/20">
                <textarea
                    name="text"
                    id="text"
                    placeholder="Enter text to translate..."
                    className="min-h-[200px] w-full resize-none rounded-[20px] border-0 bg-transparent p-6 text-lg text-foreground placeholder-zinc-400 focus:outline-none focus:ring-0"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                ></textarea>
            </div>

            <div className="flex flex-col justify-center gap-4 lg:w-32">
                <button
                    type="submit"
                    disabled={loading || !text}
                    className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-pink-600 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? (
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        ) : (
                            "→"
                        )}
                    </span>
                    <div className="absolute inset-0 -z-0 bg-gradient-to-r from-pink-600 to-indigo-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </button>
            </div>

            <div className="relative flex-1 rounded-3xl border border-white/20 bg-white/40 shadow-xl backdrop-blur-xl dark:bg-black/40">
                <div className="h-full min-h-[200px] p-6">
                    {translatedInput ? (
                        <p className="text-lg leading-relaxed text-foreground">{translatedInput}</p>
                    ) : (
                        <p className="text-lg leading-relaxed text-zinc-400 italic">Translation will appear here...</p>
                    )}
                </div>
            </div>
        </form>
    </div>
    )
}

/*
first loading
translation app
img under login
change that image whene hover on loading
select me Vs no select me (crying effect)
*/