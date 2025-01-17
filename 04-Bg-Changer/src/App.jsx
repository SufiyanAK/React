import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState('')

  const colors = [
    "Red",
    "Blue",
    "Green",
    "Olive",
    "Purple",
    "Orange",
    "Pink",
    "Brown",
    "Black",
    "Skyblue"
  ];

  return (
    <>
      <div className="w-full h-screen duration-200" style={{ backgroundColor: color }}>
        <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
          <div className='flex flex-wrap justify-center gap-3 shadow-lg bg-gray-800 rounded-xl px-3 py-2'>
            {colors.map((color) => (
              <button onClick={() => setColor(c => c = color)} className='outline-none px-4 text-lg font-bold text-white rounded-md' style={{ backgroundColor: color }}>{color}</button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
