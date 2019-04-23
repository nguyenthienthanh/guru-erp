import { makeStyles, Theme } from '@material-ui/core'

const GlobalStyles = (props: any) => {
  useStyles()
  return props.children
}

const useStyles = makeStyles(({ palette }: Theme) => ({
  '@global': {
    a: {
      color: palette.primary.main,
    },
  },
}))

export default GlobalStyles
