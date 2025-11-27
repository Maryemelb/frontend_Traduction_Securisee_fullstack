"use client"
import { stringify } from "querystring"
import { useState } from "react"

export default function Translate(){
    const [text, setText]= useState('')
    const [choice, setChoice] = useState('')
    const [translatedInput, setTranslatedInput] = useState('')
    console.log(choice)

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
        <div>
            <form action="" onSubmit={submitTranslate}>
            <textarea name="text" id="text" onChange={e=>setText(e.target.value)}></textarea>
            <select name="" id="" value={choice} onChange={e=>setChoice(e.target.value)}>
            <option value="FR -> EN">FR to EN</option>
            <option value="EN -> FR">EN to FR</option>
            </select>
            <p>{translatedInput}</p>
            <button type="submit">translate</button>
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