import React from 'react'

import { radios, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import Spinner, { SpinnerProps } from './Spinner'

const stories = storiesOf('Components', module)

stories.addDecorator(withKnobs)

stories.add('Spinner', () => {
  const variant = radios(
    'variant',
    {
      default: 'default',
      'full-screen': 'full-screen',
      'fill-parent': 'fill-parent',
      overlay: 'overlay',
    },
    'default',
  ) as SpinnerProps['variant']

  return (
    <div
      style={{
        height: 400,
        width: 400,
        border: 'solid 1px',
        position: 'relative',
      }}
    >
      <div>Content</div>
      <Spinner variant={variant} />
    </div>
  )
})
