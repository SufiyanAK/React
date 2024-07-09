import { useState } from 'react'

function App() {
  const [passwordLength, setPasswordLength] = useState(8)

  const handleChange = (e) => {
    setPasswordLength(e.target.value)
  }

  return (
    <>
      <div className='font-mono w-full h-screen flex flex-col justify-center items-center'>
        <h1 className='text-5xl font-bold'>Password Generator</h1>
        <div className='bg-black rounded-md px-5 py-3'>
          <div className='bg-white rounded-md flex justify-between gap-2'>
            <input className='flex-1 text-xl p-2 outline-black' type="text" name="" id="" />
            <button className='bg-green-500 px-3 py-2 rounded-md text-white font-bold'>Copy</button>
          </div>
          <div className='mt-4 text-white flex items-center gap-x-4'>
            <input onChange={handleChange} type="range" min={8} max={20} minLength={8} maxLength={20} />
            <div>Length: {passwordLength}</div>
            <input type="checkbox" />
            <div>Character</div>
            <input type="checkbox" />
            <div>Number</div>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
