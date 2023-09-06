import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {


let [counter,setCounter] = useState(5)

const addvalue=()=>{
  if(counter<20){
  setCounter(counter+1)
}else{
console.log("value are limited");}
}
function decresevalue(){
if(counter>0)
  setCounter(counter--);
}


  return (
 
    <>
    <h1>Chai or React</h1>
    <h2>Counter Value : {counter}</h2>
    <button 
    onClick={addvalue}
    >Add value</button>
    <br  />
    <button 
    onClick={decresevalue}
    >remove value</button>
    
    
    </>
  )
}

export default App
