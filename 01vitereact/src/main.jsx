import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

function Myapp(){
    return(
       <div>
        <h1>custom appDay

😀 !</h1>
       </div>
    )
}


const reactElement = {
    type: 'a',
    
    props:{
        href: 'http://google.com',
        target: '_blanck',
    },
    children :'Click me to open google',
}




const anotherElement = 
    (<a href="https://google.com" target = '_blanck'> Visit Google </a>
)



ReactDOM.createRoot(document.getElementById('root')).render(
 
    anotherElement
) 
