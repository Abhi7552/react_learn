import React from 'react'
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      acive: true
    },
    {
      name: "Login",
      slug: "/login",
      acive: !authStatus
    },
    {
      name: "SignUp",
      slug: "/signup",
      acive: !authStatus
    },
    {
      name: "All Blogs",
      slug: "/all-blogs",
      acive: authStatus
    },
    {
      name: "Add Blog",
      slug: "/add-blog",
      acive: authStatus
    }
  ]

  return (
    <header className='py-3 shadow bg-gray-500 animate-fade-in'>
      <Container>
        <nav className='flex items-center justify-between'>
          <Link to="/" className='flex items-center gap-2'>
            <Logo />
            <h1 className='text-2xl font-bold text-white'>Blog</h1>
          </Link>
          {/* <ul className='flex items-center gap-4'>
            {navItems.map((item) => (
              item.acive ? (<li>
                <button onClick={() => navigate(item.slug)} className='text-white hover:text-blue-200 duration-200'>
                  {item.name}
                </button>
              </li>) : null
            ))}

            {authStatus && <LogoutBtn />}
          </ul> */}
          <ul className='flex items-center gap-4'>
            {navItems.map((item) => (
              item.acive ? (
                <li key={item.slug}>
                  <Link to={item.slug} className='text-white hover:text-blue-200 duration-200 relative group'>
                    <span>{item.name}</span>
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-300 transition-all group-hover:w-full"></span>
                  </Link>
                </li>
              ) : null
            ))}
            {authStatus && <LogoutBtn />}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header;