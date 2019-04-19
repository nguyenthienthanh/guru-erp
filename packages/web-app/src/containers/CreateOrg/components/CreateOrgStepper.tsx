import React from 'react'

import { makeStyles, Step, StepLabel, Stepper, Theme } from '@material-ui/core'

type CreateOrgStepperProps = {
  activeStep: number
  classes?: Partial<Record<'stepper', string>>
}

const steps = ['Business info', 'Team', 'Modules']

const CreateOrgStepper = (props: CreateOrgStepperProps) => {
  const classes = useStyles(props)

  return (
    <Stepper activeStep={props.activeStep} classes={{ root: classes.stepper }}>
      {steps.map((step, index) => (
        <Step key={step} completed={index < props.activeStep}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

const useStyles = makeStyles(({ spacing }: Theme) => ({
  stepper: {
    padding: spacing(3, 0),
  },
}))

export default CreateOrgStepper
