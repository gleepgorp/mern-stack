import { Link } from 'react-router-dom'
import React from 'react'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

function Navbar() {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <>
      <header>
        <div className="container">
          <Link to='/'>
            <h1>Workout Buddy</h1>
          </Link>
          <nav>
            {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Logout</button>
            </div>
            )}
            {!user && (
              <div>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Sign up</Link>
              </div>
            )}
          </nav>
        </div>
      </header>
    </>
  )
}

export default Navbar