import { useState ,useEffect } from 'react'
import {useDispatch } from 'react-redux'
import authService from './Appwrite/auth'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {login,logout} from './store/authSlice'


function App() {

  const [loading , setloading] = useState(false)

  const dispatch = useDispatch()

  useEffect(()=>{

    authService.getCurrrentuser()
    .then((userData)=>{
      if (userData) {
        dispatch(login({userData}))
        
      }
      else{
        dispatch(logout())

      }
    })

    .finally(()=>{setloading(false)})
    


  })









  return (!loading) ? (<div className='min-h-screen flex flex-wrap content-between bg-gray-400'> 
  <div className='w-full block'>
    <Header />
    <main>
      <outlet />
    </main>
    <Footer />

  </div>
  
  </div>) : null
}

export default App
