import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './index'

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

