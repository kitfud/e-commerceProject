import React, {useState} from 'react'
import {Paper,Stepper,Step,StepLabel,Typography,CircularProgress,Divider,Button} from '@material-ui/core'
import useStyles from './styles';


const Checkout = () => {
    const steps = ['Shipping address','Payment details'];
    const [activeStep,setActiveStep]= useState(0);
    const classes = useStyles();

    return (
        <>
        <div className={classes.toolbar}/>
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Checkout</Typography>
                <Stepper activeStep={activeStep} className = {classes.stepper}>
                {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
                </Stepper>
            </Paper>
        </main>
        </>
    )
}

export default Checkout
