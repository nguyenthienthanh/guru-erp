import React from 'react'

import { CircularProgress } from '@material-ui/core'
import { CircularProgressProps } from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/styles'
import classnames from 'classnames'

type FullScreenSpinnerProps = CircularProgressProps
const FullScreenSpinner = (props: FullScreenSpinnerProps) => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <CircularProgress {...props} />
  </div>
)

export type SpinnerProps = {
  /**
   * Spinner variant
   * @default "default"
   */
  variant?: 'default' | 'full-screen' | 'fill-parent' | 'overlay'
  circularProgressProps?: CircularProgressProps
}

const Spinner = ({ variant, circularProgressProps }: SpinnerProps) => {
  const classes = useStyles()

  switch (variant) {
    case 'full-screen':
      return <FullScreenSpinner {...circularProgressProps} />
    case 'fill-parent':
      return (
        <div className={classnames(classes.root, classes.fillParent)}>
          <CircularProgress {...circularProgressProps} />
        </div>
      )
    case 'overlay':
      return (
        <div className={classnames(classes.root, classes.overlay)}>
          <CircularProgress {...circularProgressProps} />
        </div>
      )

    case 'default':
    default:
      return <CircularProgress {...circularProgressProps} />
  }
}

const useStyles = makeStyles(() => ({
  root: {},
  fillParent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(245, 245, 245, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
}))

export default Spinner
