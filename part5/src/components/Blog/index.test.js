import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './index'
import userEvent from '@testing-library/user-event/'

test('renders blog title and author', () => {
  const blogData = {
    title: 'my testing blog',
    author: 'michael',
    url: 'google.com',
    likes: 50,
    user: {
      username: 'mike'
    }
  }

  render(<Blog blog={blogData} handleLike={() => {}} handleDelete={() => {}} />)

  expect(screen.getByTestId('titleAuthor')).toBeVisible()
  expect(screen.getByText(/my testing blog/)).toBeVisible()
})

test('view more button shows likes and url', async () => {
  const blogData = {
    title: 'my testing blog',
    author: 'michael',
    url: 'google.com',
    likes: 50,
    user: {
      username: 'mike'
    }
  }

  localStorage.setItem('user', '{"user": "mike"}')

  render(<Blog blog={blogData} handleLike={() => {}} handleDelete={() => {}} />)

  const user = userEvent.setup()
  await user.click(screen.getByTestId('viewToggle'))

  expect(screen.getByText(/google.com/)).toBeVisible()
  expect(screen.getByText(/50/)).toBeVisible()
})

test('like button triggers handlelike function', async () => {
  const blogData = {
    title: 'my testing blog',
    author: 'michael',
    url: 'google.com',
    likes: 50,
    user: {
      username: 'mike'
    }
  }

  localStorage.setItem('user', '{"user": "mike"}')

  const handleLike = jest.fn()
  render(<Blog blog={blogData} handleLike={handleLike} handleDelete={() => {}} />)

  const user = userEvent.setup()
  await user.click(screen.getByTestId('viewToggle'))
  await user.click(screen.getByText('like'))
  await user.click(screen.getByText('like'))

  expect(handleLike).toBeCalledTimes(2)
})
