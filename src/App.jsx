import { useCallback, useEffect, useRef, useState } from "react";

function Passgen() {
    const [lenght, setLength] = useState(8)
    const [numbAllow, setNumbAllow] = useState(false)
    const [charAllow, setCharAllow] = useState(false)
    const [password, setPassword] = useState("")
    const [history, setHistory] = useState([]);

 
    // ref hook
    const passwordRef = useRef(null)

    const passGenrator = useCallback(() => {
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

        if (numbAllow) str += "0123456789"
        if (charAllow) str += "!@#$%^&*"
        for (let i = 1; i <= lenght; i++) {
            let char = Math.floor(Math.random() * str.length + 1)
            pass += str.charAt(char)
        }

        setPassword(pass)

    }, [lenght, numbAllow, charAllow, setPassword])

    const changeHistory = () => {
        setHistory((prevHistory) => {
            const updatedHistory = [password, ...prevHistory];
            return updatedHistory.slice(0, 3);
        });
    }
    const copyPasswordToClipboard = useCallback(() => {
        passwordRef.current?.select()
        passwordRef.current?.setSelectionRange(0, 16)
        window.navigator.clipboard.writeText(password)

    }, [password])

    useEffect(() => {
        passGenrator()
    }, [lenght, numbAllow, charAllow])

    useEffect(() => {
        changeHistory()
    }, [numbAllow, charAllow, lenght])
    
    // if (history.length > 0) {
    //     console.log("yes");
    // } else {
    //     return (
    //         <div className="flex justify-between mb-1">
    //             <p className="text-gray-900">No History</p>
    //             <button className="outline-none bg-blue-700 text-white px-3 py-1.5 shrink-0 rounded-md text-center">Copy</button>
    //         </div>
    //     );
    // }
    
    return (

        <div className=" max-w-lg mx-auto shadow-md rounded-lg bg-gray-700 px-4 py-3 my-8">
            <h1 className="text-white text-center text-2xl mb-4">Password Generator</h1>
            <div className="flex shadow rounded-lg overflow-hidden mb-4">
                <input
                    type="text"
                    value={password}
                    className="outline-none w-full py-1 px-3"
                    readOnly
                    placeholder="Password"
                    ref={passwordRef}
                />
                <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">Copy</button>
            </div>
            <div className="flex flex-wrap text-sm gap-x-2">
                <div className="flex items-center gap-x-1">
                    <input
                        type="range"
                        min={8}
                        max={16}
                        className="cursor-pointer"
                        onChange={(e) => { setLength(e.target.value) }}
                        value={lenght}
                    />
                    <label className="text-white text-lg">Lenght: {lenght}</label>
                </div>
                <div className="flex flex-wrap items-center gap-x-1">
                    <input
                        type="checkbox"
                        defaultChecked={numbAllow}
                        onChange={() => {
                            setNumbAllow(prev => !prev)
                        }}
                    />
                    <label className="text-white text-lg">Number</label>
                </div>
                <div className="flex flex-wrap items-center gap-x-1">
                    <input
                        type="checkbox"
                        defaultChecked={charAllow}
                        onChange={() => {
                            setCharAllow(prev => !prev)
                        }}
                    />
                    <label className="text-white text-lg">Special Character</label>
                </div>
            </div>
            <div className="flex flex-col p-2 bg-gray-500 rounded-lg">
                <h2 className="text-white text-lg mb-2">Password History</h2>
                
                {history.length > 0 ? (
          <ul>
            {history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <div className="flex justify-between mb-1">
            <p className="text-gray-900">No History</p>
            <button className="outline-none bg-blue-700 text-white px-3 py-1.5 shrink-0 rounded-md text-center">
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  


        


    )
}

export default Passgen;