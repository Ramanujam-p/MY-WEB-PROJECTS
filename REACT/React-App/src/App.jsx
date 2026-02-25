import React, { useState } from 'react'
const App = () => {
    const [count, setCount] = useState(0)
    const increase = () => {
        setCount(a => a + 1)
    }
    const decrease = () => {
        setCount(a=>a-1)
    }
    const reset = () => {
        setCount(0)
    }
    return (
        <div style={{textAlign:"center",marginTop:"50px"}}>
            <h1>Count:{count}</h1>
            <button onClick={increase}>increase</button>
            <button onClick={decrease}>decrease</button>
            <button onClick={reset}>reset</button>
        </div>
    )
}
export default App;