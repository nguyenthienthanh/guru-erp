import React from 'react'

import { cleanup, render } from 'react-testing-library'

import Spinner, { SpinnerProps } from './Spinner'

describe('<Spinner />', () => {
  afterEach(cleanup)
  it('renders all variants without crashing', () => {
    const variants: SpinnerProps['variant'][] = ['default', 'fill-parent', 'full-screen', 'overlay']

    variants.forEach((variant) => {
      const { baseElement } = render(<Spinner variant={variant} />)
      expect(baseElement).toBeInTheDocument()
    })
  })
})
