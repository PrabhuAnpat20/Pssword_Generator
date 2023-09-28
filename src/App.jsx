import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [length, setLength] = useState(7)
  const [numberAllowed, setNumberallowed] = useState(false)
  const [charallowed, setCharallowed] = useState(false)
  const [password, setPassword] = useState("")


  //useRef hook
  const passwordRef=useRef(null)
  
  const passwordGenerator = useCallback(() => {
    let pass = " "
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charallowed) str += "!@#$%&*"

    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charallowed, setPassword])
  
  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current.select()
    window.navigator.clipboard.writeText(password)
  })  
  useEffect(()=>{passwordGenerator()},[length,numberAllowed,charallowed,passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-700 bg-gray-800'>
        <h1 className='text-white text-center'>Password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={100} value={length} className='cursor-pointer ' onChange={(e) => { setLength(e.target.value) }} /><label >Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input type="checkbox" defaultChecked={numberAllowed} onChange={()=>{setNumberallowed((prev)=>!prev)}} />
              <label htmlFor="number input">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input type="checkbox" defaultChecked={charallowed} onChange={()=>{setCharallowed((prev)=>!prev)}} />
              <label htmlFor="char input">Characters</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
