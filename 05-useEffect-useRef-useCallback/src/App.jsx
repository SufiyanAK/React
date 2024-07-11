import { useState, useEffect, useCallback, useRef } from 'react'

function App() {
  const [passwordLength, setPasswordLength] = useState(8)
  const [isCharAllowed, setIsCharAllowed] = useState(true)
  const [isNumberAllowed, setIsNumberAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const passwordRef = useRef(null)

  // GENERATING PASSWORD
  const passwordGen = useCallback(() => {
    let pass = '';
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (isNumberAllowed) {
      str += '0123456789';
    }

    if (isCharAllowed) {
      str += '!@#$%&*~/|(){}[]';
    }

    for (let i = 1; i <= passwordLength; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [passwordLength, isNumberAllowed, isCharAllowed, setPassword])

  const copyPasswordTOClip = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])


  // USE EFFECT HOOK TO GENERATE ON EVERY CHANGE ON THE DEPENDENCIES
  useEffect(() => {
    passwordGen();
  }, [passwordLength, isNumberAllowed, isCharAllowed, passwordGen])

  return (
    <>
      <div
        className='font-mono w-full h-screen flex flex-col gap-y-4 justify-center items-center bg-slate-500'>
        <h1
          className='text-5xl font-bold'>Password Generator</h1>
        <div
          className='bg-black rounded-md px-5 py-4'>
          <div
            className='bg-white rounded-md flex justify-between gap-2'>

            {/* PASSWORD DISPLAY */}
            <input
              className='flex-1 text-xl p-2 outline-none' value={password} readOnly type="text" ref={passwordRef} />
            <button
              className='bg-green-500 hover:bg-green-700 cursor-pointer px-3 py-2 rounded-md text-white font-bold duration-200'
              onClick={copyPasswordTOClip}
            >
              Copy
            </button>
          </div>
          <div
            className='mt-4 text-white flex items-center gap-x-4'>
            {/* INPUT TYPE RANGE FOR LENGTH */}
            <input
              onChange={(e) => { setPasswordLength(e.target.value) }}
              type="range" min={8} max={20} />
            <label>Length: {passwordLength}</label>

            {/* INPUT TYPE CHECK FOR SPECIAL CHAR */}
            <input
              type="checkbox" id='charInput'
              defaultChecked={isCharAllowed}
              onChange={() => { setIsCharAllowed(c => !c) }}
            />
            <label className='cursor-pointer' htmlFor='charInput' >Character</label>

            {/* INPUT TYPE CHECK FOR NUMBER */}
            <input
              type="checkbox" id='numberInput'
              defaultChecked={isNumberAllowed}
              onChange={() => { setIsNumberAllowed(n => !n) }}
            />
            <label className='cursor-pointer' htmlFor='numberInput' >Number</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
