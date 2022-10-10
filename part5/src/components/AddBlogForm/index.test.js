import { render, screen } from '@testing-library/react'
import AddNewBlog from './AddBlogForm'
import userEvent from '@testing-library/user-event'
import React from 'react'

test('successful new blog', async () => {


  localStorage.setItem('user', '{"user": "mike"}')

  const handleSubmit = jest.fn()
  render(<AddNewBlog handleSubmit={handleSubmit}/>)

  const user = userEvent.setup()
  await user.type(screen.getByTestId('title'), 'new blog post')
  await user.type(screen.getByTestId('author'), 'jeffy')
  await user.type(screen.getByTestId('url'), 'google.com')

  await user.click(screen.getByText('create'))

  expect(handleSubmit).toBeCalledWith({ 'author': 'jeffy',
    'title': 'new blog post',
    'url': 'google.com',
  })
})
