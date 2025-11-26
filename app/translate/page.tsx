"use client"
import { useState } from "react"

export default function Translate(){
    const [text, setText]= useState('')
    return (
        <div>
            <form action="">
            <textarea name="text" id="text" onChange={e=>setText(e.target.value)}></textarea>
            <button type="submit"></button>

            </form>
        </div>
    )
}