import { useState,useEffect,useCallback,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)//for the length of the password
  const [numAllowed, setNumAllowed] = useState("false")
  const [charAllowed, setcharAllowed] = useState("false")
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)//useRef hook


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed)
      str = str + "1234567890"
    if (charAllowed)
      str = str + "@#%$&*+"
    //random string generating
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass = pass + str.charAt(char)
      setPassword(pass)
    }

  }, [length, numAllowed, charAllowed, setPassword])

  useEffect(() => { passwordGenerator() },
    [length, numAllowed, charAllowed, passwordGenerator])

  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(password)//for copying the password
    passwordRef.current.select()
    // Reset the text after a short delay
    //passwordRef.current.innerText = 'Copied';
  }, [password])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-2xl text-cente text-white my-3'>Password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPassword}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => { setLength(e.target.value) }} />
            {/*here e is the event acc to syntax.
                it is used to create the sliding row*/}
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => {
                setNumAllowed((prev) => !prev)
              }} />
            <label htmlFor="numberInput">Number</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setcharAllowed((prev) => !prev)
              }} />
            <label htmlFor="characterInput">Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
