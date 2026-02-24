import {useState} from 'react'
const App = () => {
    const [m, c] = useState("Hello Rama")
    const f = () => {
      return(c("Are you Interested to learn React?"))  
    }
    return (
        <div style={{textAlign:"center",marginTop:"50px"}}>
            <h1>{m}</h1>
            <button onClick={f}>ClickMe</button>
        </div>
    )
}
export default App