import React from 'react'

import { withInfo } from '@storybook/addon-info'
import { addDecorator, configure } from '@storybook/react'
import { setDefaults } from 'react-storybook-addon-props-combinations'

import MaterialUIProvider from '../src/providers/MaterialUIProvider'

// automatically import all files ending in *.stories.tsx
const componentsDir = require.context('../src/components', true, /.(stories|story).tsx$/)

function loadStories() {
  addDecorator(
    withInfo({
      inline: true,
      header: false,
      styles: (stylesheet) => {
        return {
          ...stylesheet,
          header: {
            ...stylesheet.header,
          },
          infoBody: {
            ...stylesheet.infoBody,
            fontFamily:
              'Dank Mono, Helvetica Neue, Helvetica, Segoe UI, Arial, freesans, sans-serif',
          },
        }
      },
    }),
  )

  addDecorator((story) => <MaterialUIProvider>{story()}</MaterialUIProvider>)

  componentsDir.keys().forEach(componentsDir)
}

setDefaults({
  // overwrite global defaults here
})

configure(loadStories, module)
