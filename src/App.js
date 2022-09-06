import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
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
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logIn = async (e) => {
    e.preventDefault()
    console.log('LogIn clicked');

    try {
      const userInfo = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(userInfo)
      )

      blogService.setToken(userInfo.token)
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

  const logout = (e) => {
    e.preventDefault()
    console.log('log out clicked');
    window.localStorage.clear()
    setUser(null)
  }

  const createBlog = async (e, title, author, url) => {
    e.preventDefault()
    console.log('create blog clicked');
    try {
      const newBlog = {
        title: title,
        author: author,
        url: url
      }

      const blog = await blogService.create(newBlog)
      console.log('new blog', blog);
      

      if (blog) {
        const newBlogs = [...blogs, blog]
        setBlogs(newBlogs)
        setMessage(`A new blog "${title}" added by ${user.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    }
    catch (er) {
      console.log('something wrong with creating a new blog!');

      setErrorMessage('Something wrong with creating a new blog!')
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
              onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)} />
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

      <p>{user.name} logged in <button onClick={(e) => logout(e)}>Log out</button></p>

      <NewBlogForm createBlog={createBlog} />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
