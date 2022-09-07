import { useState } from "react"

const Blog = ({ blog, increaseLikes, removeBlog, user }) => {
  //console.log('blogista', blog.user);
  //console.log('userista', user.username);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [viewState, setViewState] = useState(false)

  const toggleVisibility = () => {
    setViewState(!viewState)
  }

  const addLikes = (e) => {
    e.preventDefault()

    const modifBlog = {
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    increaseLikes(modifBlog, blog.id)
  }

  const handleRemove = (e) => {
    e.preventDefault()
    const answer = window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)
    if (answer) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      {!viewState ?
        <div>
          {blog.title}
          <button onClick={toggleVisibility}>view</button>
        </div>
        :
        <div>
          <div>
            {blog.title}
            <button onClick={toggleVisibility}>hide</button>
          </div>
          <div>
            {blog.url}
          </div>
          <div>
            likes {blog.likes} <button onClick={addLikes}>like</button>
          </div>
          <div>
            {blog.author}
          </div>
          <div>
            {blog.user.username === user.username ?
              <button onClick={handleRemove}>remove blog</button>
              :
              ''
            }
          </div>
        </div>
      }
    </div>
  )
}

export default Blog