import { Outlet, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logOut } from '../../../services/firebase'

import styles from './Header.module.css'

export const navigates = [
  {
    id: 1,
    name: 'Main',
    to: '/'
  },
  {
    id: 2,
    name: 'Profile',
    to: '/profile'
  },
  {
    id: 3,
    name: 'Chat',
    to: '/chats'
  },
  {
    id: 4,
    name: 'About',
    to: '/about'
  },
  {
    id: 5,
    name: 'Articles',
    to: '/articles'
  },
  {
    id: 6,
    name: 'Gists',
    to: '/gists'
  },
  {
    id: 7,
    name: 'SignIn',
    to: '/signin'
  },
  {
    id: 8,
    name: 'SignUp',
    to: '/signup'
  },
]

export function Header() {
  const navigate = useNavigate()

  const name = useSelector((store) => store.profile.name)
  const isAuth = useSelector((store) => store.profile.isAuth)

  const handleLogin = () => {
    navigate('/signin')
  }
  const handleSignUp = () => {
    navigate('/signup')
  }
  const handleLogout = async () => {
    await logOut()
  }

  return (
    <>
      <header>
        <nav className={styles.header}>
          <ul>
            {navigates.map((link) => (
              <li key={link.id}>
                <NavLink
                  to={link.to}
                  style={({ isActive }) => ({
                    color: isActive ? 'green' : 'blue'
                  })}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          {!isAuth && (
            <>
              <button onClick={handleLogin}>login</button>
              <button onClick={handleSignUp}>sign up</button>
            </>
          )}
          {isAuth && (
            <>
              <button onClick={handleLogout}>logout</button>
            </>
          )}
          <p>{name}</p>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}