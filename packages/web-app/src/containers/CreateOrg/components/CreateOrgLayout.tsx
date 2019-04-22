import React, { ComponentType, ReactNode } from 'react'

import HappyFeeling from '@guru-erp/illustrations/lib/undraw/HappyFeeling'
import {
  Button,
  Container,
  Fade,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core'
import { ButtonProps } from '@material-ui/core/Button'
import { OutlinedTextFieldProps } from '@material-ui/core/TextField'
import Logo from 'components/shared/Logo'
import Spinner from 'components/shared/Spinner'
import useCurrentAccount from 'hooks/useCurrentAccount'

export type CreateOrgLayoutProps = {
  formTitle: string
  formFields: (props: {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    loading: boolean
    TextField: ComponentType<Partial<OutlinedTextFieldProps>>
  }) => ReactNode
  nextButton: (NextButton: ComponentType<Partial<ButtonProps>>) => ReactNode
}

const CreateOrgLayout = (props: CreateOrgLayoutProps) => {
  useCurrentAccount()

  const classes = useStyles()

  const [activeStep, setActiveStep] = React.useState(0)
  const [loading, setLoading] = React.useState(false)

  const goNextStep = () => {
    if (activeStep > 2) return
    setActiveStep(activeStep + 1)
  }

  const goPrevStep = () => {
    if (activeStep < 0) return
    setActiveStep(activeStep - 1)
  }

  return (
    <Fade in>
      <Container className={classes.root} maxWidth="lg">
        <Logo />

        <aside className={classes.aside}>
          <Grid container spacing={2}>
            <Grid item sm={6} lg={4}>
              <div className={classes.header}>
                <Typography variant="h4" color="primary" gutterBottom>
                  Setting up your business
                </Typography>
                <Typography color="textSecondary">
                  To starting manage your business, you should setting it up first. Follow our
                  step-by-step instruction for easy installation business module and don’t waste
                  your time to do something nonsenses here please. Just go with it.
                </Typography>
              </div>

              <div>
                <Typography variant="h5">{props.formTitle}</Typography>

                {/* <CreateOrgStepper activeStep={activeStep} /> */}

                <form autoComplete="off" className={classes.formFields}>
                  {props.formFields({
                    loading,
                    setLoading,
                    TextField: (textFieldProps: Partial<OutlinedTextFieldProps>) => (
                      <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        disabled={loading}
                        {...textFieldProps}
                      />
                    ),
                  })}
                </form>

                <Grid container spacing={1} className={classes.formActions}>
                  {/* <Grid item>
                  <Button size="large" variant="contained" onClick={goPrevStep}>
                    Back
                  </Button>
                </Grid> */}
                  <Grid item xs />
                  <Grid item>
                    {props.nextButton((props) => (
                      <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        className={classes.nextButton}
                        disabled={loading}
                        onClick={goNextStep}
                        disableRipple
                        {...props}
                      >
                        {loading && (
                          <Spinner
                            color="secondary"
                            circularProgressProps={{ size: 20 }}
                            variant="overlay"
                          />
                        )}
                        {props.children || 'Next'}
                      </Button>
                    ))}
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs />
            <Grid item sm={5} lg={7}>
              <HappyFeeling width="100%" height="100%" />
            </Grid>
          </Grid>
        </aside>
      </Container>
    </Fade>
  )
}

const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  root: {
    paddingTop: spacing(8),
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },

  aside: {
    margin: 'auto 0',
    padding: spacing(8, 0, 20),
  },

  header: {
    marginBottom: spacing(4),
  },

  formFields: {
    marginTop: spacing(2),
  },

  formActions: {
    marginTop: spacing(2),
  },

  nextButton: {
    position: 'relative',
    overflow: 'hidden',
  },

  '@global': {
    body: {
      backgroundColor: palette.background.paper,
    },
  },
}))

export default CreateOrgLayout
