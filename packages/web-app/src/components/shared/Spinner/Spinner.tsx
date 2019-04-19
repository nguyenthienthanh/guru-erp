import React from 'react'

import { CircularProgress, LinearProgress } from '@material-ui/core'
import { CircularProgressProps } from '@material-ui/core/CircularProgress'
import { LinearProgressProps } from '@material-ui/core/LinearProgress'
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
  variant?: 'default' | 'full-screen' | 'fill-parent' | 'overlay' | 'overlay-linear'
  circularProgressProps?: CircularProgressProps
  color?: CircularProgressProps['color'] | LinearProgressProps['color']
}

const Spinner = ({ variant, circularProgressProps, color }: SpinnerProps) => {
  const classes = useStyles()

  const props = {
    color,
    ...circularProgressProps,
  }

  switch (variant) {
    case 'full-screen':
      return <FullScreenSpinner {...props} />
    case 'fill-parent':
      return (
        <div className={classnames(classes.root, classes.fillParent)}>
          <CircularProgress {...props} />
        </div>
      )
    case 'overlay':
      return (
        <div className={classnames(classes.root, classes.overlay)}>
          <CircularProgress {...props} />
        </div>
      )
    case 'overlay-linear':
      return (
        <div className={classnames(classes.root, classes.overlayLinear)}>
          <LinearProgress style={{ width: '100%' }} color={color as any} />
        </div>
      )

    case 'default':
    default:
      return <CircularProgress {...props} />
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
  overlayLinear: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(245, 245, 245, 0.5)',
    display: 'flex',
    zIndex: 1,
  },
}))

export default Spinner
