import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders only title and author as a default  ', () => {
  const blog = {
    title: 'this is a title',
    author: 'author',
    url: 'url',
    likes: 3
  }

  const { container } = render(<Blog blog={blog} />)

  //Queryselector for getting the default view
  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent('this is a title')
  expect(div).toHaveTextContent('author')
  expect(div).not.toHaveTextContent('url')
  expect(div).not.toHaveTextContent(3)

})

test('clicking the view button renders also url and likes ', async () => {
  const blog = {
    title: 'this is a title',
    author: 'author',
    url: 'url',
    likes: 3,
    user: {
      name: 'leijona',
      username: 'leijonakuningas'
    }
  }

  const user_ = {
    name: 'susi',
    username: 'susihukka'
  }

  const { container } = render(<Blog blog={blog} user={user_} />)
  //Getting and clickin the view button
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  //query selector for selecting the conent with more info
  const div = container.querySelector('.blog-whole')

  expect(div).toHaveTextContent('this is a title')
  expect(div).toHaveTextContent('author')
  expect(div).toHaveTextContent('url')
  expect(div).toHaveTextContent(3)

})

test('if component s like button is clicked twice, the event handler is called twice', async () => {
  const blog = {
    id: '1234',
    title: 'this is a title',
    author: 'author',
    url: 'url',
    likes: 3,
    user: {
      name: 'leijona',
      username: 'leijonakuningas'
    }
  }

  const user_ = {
    name: 'susi',
    username: 'susihukka'
  }
  //Mockhandler and rendering the Blog-component
  const mockHandler = jest.fn()
  const { container } = render(<Blog blog={blog} user={user_} increaseLikes={mockHandler} />)

  //user events and view button for viewing more info
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  //query selector for selecting the conent with more info
  const div = container.querySelector('.blog-whole')

  const likeButton = screen.getByText('like')
  expect(likeButton).toBeDefined()
  //Clickin like button twice
  await user.click(likeButton)
  await user.click(likeButton)
  //Expecting to have 2 times called teh mockHandler
  expect(mockHandler.mock.calls).toHaveLength(2)

})
