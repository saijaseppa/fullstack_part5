import { useState } from "react"

const Blog = ({ blog, increaseLikes }) => {

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
      user: blog.user.id,
      likes: blog.likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
  
    increaseLikes(modifBlog, blog.id)
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
        </div>
      }
    </div>
      )
}

      export default Blog