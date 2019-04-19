import React, { ComponentType, ReactNode } from 'react'

import { SvgProps } from '@guru-erp/illustrations/lib/types'
import {
  Button,
  Fade,
  Grid,
  Hidden,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core'
import { ButtonProps } from '@material-ui/core/Button'
import { OutlinedTextFieldProps } from '@material-ui/core/TextField'
import GradientPaper from 'components/shared/GradientPaper'
import Logo from 'components/shared/Logo'
import Spinner from 'components/shared/Spinner'

interface SignInSignUpLayoutProps {
  direction?: 'row' | 'row-reverse'
  image: ComponentType<SvgProps>
  form: ({
    TextField,
    SubmitButton,
  }: {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    loading: boolean
    TextField: ComponentType<Partial<OutlinedTextFieldProps> & { onPressEnter?: any }>
    SubmitButton: ComponentType<ButtonProps>
  }) => ReactNode
  formTitle: string
  bottomText: JSX.Element
}

const SignInSignUpLayout = (props: SignInSignUpLayoutProps) => {
  const classes = useStyles(props)
  const [loading, setLoading] = React.useState(false)

  const ImageSvg = props.image

  return (
    <Fade in>
      <Grid container spacing={2} direction={props.direction}>
        <Grid item md={6} sm={7}>
          <Logo classes={{ root: classes.logo }} />
          <Typography variant="h3" color="primary" gutterBottom>
            Solution for your happy business
          </Typography>
          <Typography color="textSecondary">
            Guru is a suite of open source business apps that cover all your company needs: CRM,
            eCommerce, accounting, inventory, point of sale, project management, etc. Guru's unique
            value proposition is to be at the same time very easy to use and fully integrated.
          </Typography>
          <ImageSvg height={400} className={classes.imageSvg} />
        </Grid>

        <Hidden smDown>
          <Grid item xs />
        </Hidden>

        <Grid item md={4} sm={5}>
          <GradientPaper>
            {loading && <Spinner variant="overlay-linear" color="secondary" />}
            <div className={classes.alignCenter}>
              <Typography variant="h4" gutterBottom color="textPrimary">
                {props.formTitle}
              </Typography>
              <Typography color="textSecondary" variant="h6">
                Welcome to Guru ERP
              </Typography>
            </div>
            <form autoComplete="off" className={classes.formWrapper}>
              {props.form({
                loading,
                setLoading,
                TextField: ({
                  onPressEnter,
                  ...props
                }: Partial<OutlinedTextFieldProps> & { onPressEnter?: any }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    InputProps={{ classes: { focused: classes.textFieldFocused } }}
                    InputLabelProps={{ classes: { focused: classes.textFieldLabelFocused } }}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13 && onPressEnter) onPressEnter()
                    }}
                    {...props}
                  />
                ),
                SubmitButton: (props) => (
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    classes={{
                      root: classes.submitButton,
                      disabled: classes.submitButtonDisabled,
                    }}
                    onClick={props.onSubmit}
                    {...props}
                  />
                ),
              })}
            </form>
            <div className={classes.bottomTextWrapper}>{props.bottomText}</div>
          </GradientPaper>
        </Grid>
      </Grid>
    </Fade>
  )
}

const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  imageSvg: {
    margin: spacing(6, 0),
  },
  alignCenter: {
    textAlign: 'center',
  },
  formWrapper: {
    margin: spacing(4, 0),
  },
  textFieldFocused: {
    '& fieldset': {
      borderColor: `${palette.common.white} !important`,
    },
  },
  textFieldLabelFocused: {
    color: `${palette.common.white} !important`,
  },
  textFieldLabelError: {
    color: `yellow !important`,
  },
  bottomTextWrapper: {
    marginTop: spacing(2),
    textAlign: 'center',
  },
  submitButton: {
    color: palette.primary.main,
    background: `${palette.common.white} !important`,
    height: 56,
    marginTop: spacing(4),
  },
  submitButtonDisabled: {
    color: `${palette.text.secondary} !important`,
  },
  logo: {
    marginBottom: spacing(4),
  },
}))

export default SignInSignUpLayout
