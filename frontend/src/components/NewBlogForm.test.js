import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

test('When creating a new blog, form makes the callback with right info', async () => {
 
  //Creating userEvent and callback-mock
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<NewBlogForm createBlog={createBlog} />)

  //Getting all elements from form
  const inputTitle = screen.getByPlaceholderText('title')
  const inputAuthor = screen.getByPlaceholderText('author')
  const inputUrl = screen.getByPlaceholderText('url')
  const sendButton = screen.getByText('create')

  //Typing the texts in form
  await user.type(inputTitle, 'testing title')
  await user.type(inputAuthor, 'testing author')
  await user.type(inputUrl, 'testing url')
  await user.click(sendButton)
  
  //Expecting the results to be
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toStrictEqual(
    {title: 'testing title', author: 'testing author', url: 'testing url'})

})