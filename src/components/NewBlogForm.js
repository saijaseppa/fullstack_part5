import { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {

  const [title, setTitle ] = useState('')
  const [author, setAuthor ] = useState('')
  const [url, setUrl ] = useState('')

  const createNew = (e, title, author, url) => {
    e.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    createBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={(e) => createNew(e, title, author, url)}>
      <div>
        title:
        <input
          id='title'
          type="text"
          placeholder='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}/>
      </div>
      <div>
        author:
        <input
          id='author'
          type="text"
          placeholder='author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        url:
        <input
          id='url'
          type="text"
          placeholder='url'
          value={url}
          onChange={(e) => setUrl(e.target.value)} />
      </div>
      <div>
        <button id='create-button' type="submit">
          create
        </button>
      </div>
      <br/>
    </form>
  )
}

export default NewBlogForm