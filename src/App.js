import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import ErrorNotification from './components/ErrorNotification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll()
      .then(blogs =>
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

  const logIn = async (e, username, password) => {
    e.preventDefault()
    console.log('LogIn clicked')

    try {
      const userInfo = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(userInfo)
      )

      blogService.setToken(userInfo.token)
      setUser(userInfo)
    }
    catch (exception) {
      console.log('wrong credentials!!')

      setErrorMessage('Wrong credentials!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logout = (e) => {
    e.preventDefault()
    console.log('log out clicked')
    setUser(null)
    window.localStorage.clear()
  }

  const createBlog = async (newBlog) => {
    console.log('create blog clicked')
    try {
      const blog = await blogService.create(newBlog)
      console.log('new blog', blog)

      if (blog) {
        blogFormRef.current.toggleVisibility()
        const newBlogs = [...blogs, blog]
        setBlogs(newBlogs)
        setMessage(`A new blog "${blog.title}" added by ${user.name}`)

        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    }
    catch (er) {
      console.log('something wrong with creating a new blog!')

      setErrorMessage('Something wrong with creating a new blog!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const increaseLikes = async (modifBlog, id) => {
    try {
      const blogResponse = await blogService.update(id, modifBlog)

      if (blogResponse) {
        console.log('modif', modifBlog)
        console.log('response', blogResponse)

        setBlogs(blogs.map(blog => blog.id === blogResponse.id ? modifBlog : blog))
      }
    }
    catch (err) {
      console.log('something wrong with adding likes!', err)

      setErrorMessage('Something wrong with adding likes!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))

    }
    catch (err) {
      console.log('something wrong with removing blog!', err)

      setErrorMessage('Something wrong with removing blog!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  if (user === null) {
    return (
      <div>
        <ErrorNotification errorMessage={errorMessage} />
        <LoginForm login={logIn} />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} />
      <ErrorNotification errorMessage={errorMessage} />

      <p>{user.name} logged in <button onClick={(e) => logout(e)}>Log out</button></p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm createBlog={createBlog} />
      </Togglable>

      {blogs.sort((a, b) => a.likes - b.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          increaseLikes={increaseLikes}
          removeBlog={removeBlog}
          user={user}/>
      )}
    </div>
  )
}

export default App
