import { useCallback, useState, useEffect } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(6)
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const generatePassword = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numbersAllowed) str += '1234567890'
    if (charAllowed) str += '!@#$%^&*()_+'
    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numbersAllowed, charAllowed]);

  useEffect(() => {
    generatePassword()
  }, [length, numbersAllowed, charAllowed])

  return (
    <>
      <div className='w-full h-screen bg-zinc-800 flex justify-center items-center'>
        <div className='w-1/2 h-1/4 fixed flex flex-col  justify-around bg-zinc-950 rounded-xl p-4'>
          <h2 className='text-2xl uppercase font-bold tracking-wider'>Pasword generator</h2>
          <div className='overflow-hidden h-1/3 w-full'>
            <input value={password} type="text" readOnly className='h-full w-full bg-white rounded-lg px-4 py-2 font-semibold text-black' />
          </div>
          <div className='flex flex-wrap gap-5'>
            <div className='flex justify-center items-center gap-3'>
              <label htmlFor="length">Length : {length} </label>
              <input
                type="range"
                min={6}
                max={50}
                value={length}
                className='cursor-pointer'
                id='length'
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
            <div className='flex justify-center items-center gap-2'>
              <label htmlFor="">Characters</label>
              <input
                defaultChecked={charAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev)
                }}
                type="checkbox"
              />
            </div>
            <div className='flex justify-center items-center gap-2'>
              <label htmlFor="">Numbers</label>
              <input
                defaultChecked={numbersAllowed}
                onChange={() => {
                  setNumbersAllowed((prev) => !prev)
                }}
                type="checkbox"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
