import { useState } from 'react'
//import PropTypes from 'prop-types'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (

    <div>
      <h2>Log in to application</h2>
      <form onSubmit={(e) => login(e, username, password)}>
        <div>
          username:
          <input
            id='username'
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password:
          <input
            id='password'
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <div>
          <button id='login-button' type="submit">login</button>
        </div>
      </form>
    </div>
  )
}

/*LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}*/

export default LoginForm
