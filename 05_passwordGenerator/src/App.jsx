import { use, useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [specialAllowed, setSpecialAllowed] = useState(true);
  const [password, setPassword] = useState('');

  const passwordRef=useRef(null);


  // Function to generate password based on the selected options
  // It uses useCallback to memoize the function so that it doesn't get recreated on every render
  // This is useful for performance optimization, especially when passing the function as a prop to child components
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numAllowed) str += "0123456789";
    if (specialAllowed) str += "!@#$%&*?";

    for (let i = 1; i <= length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(randomIndex);
    }
    setPassword(pass);

  }, [length, numAllowed, specialAllowed, setPassword]);

  // Function to copy password to clipboard
  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 26); // For mobile devices
    window.navigator.clipboard.writeText(password)
      .then(() => {
        alert("Password copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy password: ", err);
      }
    );
  }, [password]);


  // useEffect to call passwordGenerator when length, numAllowed, or specialAllowed changes
  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, specialAllowed, passwordGenerator]);

  return (
    <>
      <div className='w-full h-screen bg-gradient-to-r from-purple-500 to-blue-500 flex flex-col items-center'>
        <h1 className="text-3xl font-bold text-white text-center mt-10">
          Password Generator
        </h1>
        {/* For main input div */}
        <div className='flex shadow-lg bg-white rounded-lg p-3 mt-10 w-127 flex-row items-center justify-between'>
          <input type="text" value={password} placeholder='Password' readOnly className='w-90 text-orange-500 text-xl font-semibold outline-none'
          ref={passwordRef}
          />

          <button 
          onClick={copyToClipboard}
          className='bg-blue-500 text-white px-5 py-2 rounded ml-8'>
            Copy
          </button>
        </div>

        <div className='flex shadow-lg bg-white rounded-lg p-3 '>
          <div className=''>
            <input type="range" value={length} min={8} max={25}
              onChange={(e) => { setLength(e.target.value) }} className='cursor-pointer mr-7' />
            <label htmlFor="length">Length:{length}</label>
          </div>
          {/* Fpr numbers including */}
          <div className='ml-5'>
            <input type="checkbox" id="numInput" defaultChecked={numAllowed} onChange={() => setNumAllowed((prev)=>!prev)} />
            <label htmlFor="numInput">Numbers</label>
          </div>

          {/* for special characters */}
          <div className='ml-5'>
            <input type="checkbox" id="specialAllowed" checked={specialAllowed} onChange={() => setSpecialAllowed((prev)=>!prev)} />
            <label htmlFor="specialAllowed">Special Characters</label>
            </div>
        </div>
      </div>

    </>
  )
}

export default App
