import { useState, useCallback, useEffect, useRef } from "react";
import React from "react";
import "./index.css"

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumbetAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("")


  // use ref hook
  const passwordRef = useRef();
  
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()-_+={}[]|";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])


  
  const copyPaaswordToClipBoard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password)
  }, [password]);




  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (

    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 bg-gray-800 text-orange-500">

      <h1 className="text-white text-center my-3">Password Genertor</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        
        <input type="text" placeholder="Password" readOnly className="outline-none w-full py-1 px-3" value={password} ref={passwordRef}></input>
      
        <button className="outline-none bg-blue-700 text-teal-50 px-3 py-0.5 shrink-0" onClick={copyPaaswordToClipBoard}>Copy</button>
      </div>


      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range" min={6} max={100} className="cursor-pointer"
            value={length} onChange={(e) => { setLength(e.target.value) }} />




          <label htmlFor="length">{length}</label>

        </div>

        <div className="flex items-center gap-x-1">
          <input type="checkbox" id="numberInput" defaultChecked={numberAllowed} onChange={() => { setNumbetAllowed((prev) => !prev) }} />
          <lable htmlFor="numberInput">Number</lable>
        </div>
        
        <div className="flex items-center gap-x-1">
          <input type="checkbox" id="characterInput" defaultChecked={charAllowed} onChange={() => { setCharAllowed((prev) => !prev) }} />
          <label htmlFor="characterInput">Character</label>
        </div>
      </div>
    </div>

  )
}

export default App