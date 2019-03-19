import { withInfo } from '@storybook/addon-info'
import { addDecorator, configure } from '@storybook/react'
import { setDefaults } from 'react-storybook-addon-props-combinations'

// automatically import all files ending in *.stories.tsx
const storiesDir = require.context('../stories', true, /.stories.tsx$/)
const componentsDir = require.context('../src/components', true, /.stories.tsx$/)

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

  storiesDir.keys().forEach(storiesDir)
  componentsDir.keys().forEach(componentsDir)
}

setDefaults({
  // overwrite global defaults here
})

configure(loadStories, module)
