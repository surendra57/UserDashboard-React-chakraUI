import React from 'react'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'

const ErrorMessages = ({children,status}) => {
  return (
    <>
     <Alert status={status}>
    <AlertIcon />
    {children}
  </Alert>
    </>
  )
}

export default ErrorMessages