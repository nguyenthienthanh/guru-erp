import React from 'react'
import { cleanup, render } from 'react-testing-library'
import Empty from './Empty'

describe('<Empty />', () => {
  afterEach(cleanup)

  it('renders without crashing', () => {
    const { container } = render(<Empty />)
    expect(container.innerHTML).toBe('<div style="display: none;"></div>')
  })
})
