import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const logIn = async (e) => {
    e.preventDefault()
    console.log('LogIn clicked');

    try {
      const userInfo = await loginService.login({
        username, password
      })
      setUser(userInfo)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      console.log('wrong credentials!!');
      
      setErrorMessage('Wrong credentials!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    
  }

  if (user === null) {
    return (
      <div>
        <ErrorNotification errorMessage={errorMessage} />
        <h2>Log in to application</h2>
        <form onSubmit={logIn}>
          <div>
            username
              <input 
                type="text" 
                value={username} 
                onChange={({ target }) => setUsername(target.value)}/>
          </div>
          <div>
            password 
              <input 
                type="password" 
                value={password} 
                onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <div>
            <button type="submit">login</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      
      <h2>blogs</h2>
      <Notification message={message} />
      <ErrorNotification errorMessage={errorMessage} />

      <p>{user.name} logged in</p>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
