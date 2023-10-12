import React from 'react'
import { Container,Logo,LogoutBtn } from '../index'
import {Link} from 'react-router-dom'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import { useNavigate } from 'react-router-dom'
function Header() {

    const authstatus = useSelector((state)=>state.auth.status)
    const Navigate = useNavigate();

    const navItems = [
      {
        name : 'Home',
        slug : '/',
        active : true
      }, 
      {
        name : 'Signup',
        slug : '/signup',
        active : false
      },
      {
        name : 'Login',
        slug : '/login',
        active : !authstatus
      },
      {
        name : 'All Posts',
        slug : '/all-posts',
        active : authstatus
      },
      {
        name : 'Add Posts',
        slug : '/add-posts',
        active : authstatus
      }
    ]




  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to= '/'>
              <Logo width='100px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item)=>
            item.active ? (
              <li key={item.name}>
                 <button onClick={Navigate(item.slug)}
                 className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                 >
                  {item.name}
                  </button> 
                 </li>
            ): null )}
            {authstatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header