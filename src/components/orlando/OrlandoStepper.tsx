
"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Define a custom theme to override MUI default styles
const theme = createTheme({
  components: {
    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontSize: '0.8rem',
          fontWeight: '500',
          '&.Mui-active': {
            fontWeight: '700',
          },
          '&.Mui-completed': {
            fontWeight: '700',
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: '#cbd5e1', // slate-300
          '&.Mui-active': {
            color: '#22d3ee', // celeste
          },
          '&.Mui-completed': {
            color: '#22d3ee', // celeste
          },
        },
      },
    },
    MuiStepConnector: {
        styleOverrides: {
            line: {
                borderColor: '#cbd5e1', // slate-300
            },
        },
    },
  },
});

interface OrlandoStepperProps {
  steps: { title: string, isCompleted: boolean }[];
  activeStep: number;
}

export default function OrlandoStepper({ steps, activeStep }: OrlandoStepperProps) {
  // MUI Stepper is 0-indexed, our guide is 1-indexed.
  const muiActiveStep = activeStep ? activeStep - 1 : 0;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={muiActiveStep} alternativeLabel>
          {steps.map((step, index) => {
            const stepProps: { completed?: boolean } = {};
            // Mark step as completed based on our guide's logic, 
            // but only if it's not the currently active step.
            if (step.isCompleted && index !== muiActiveStep) {
              stepProps.completed = true;
            }
            return (
              <Step key={step.title} {...stepProps}>
                <StepLabel>{step.title}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
    </ThemeProvider>
  );
}
