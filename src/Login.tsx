import React, { FC, FormEvent, useEffect, useState } from 'react'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdbreact'
import runInitializers from './initializers/runInitializers'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'
import './Login.css'

type Props = {
  onSubmit: (credentials: Credentials) => Promise<void>
}

const Login: FC<Props> = ({ onSubmit }) => {
  useEffect(() => {
    runInitializers({ locale: 'pt-BR' })
  }, [])
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: '',
  })
  const [invalidCreds, setInvalidCreds] = useState(false)
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.currentTarget.className += " was-validated";

    if (credentials.username && credentials.password && onSubmit) {
      onSubmit(credentials).catch(() => {
        setInvalidCreds(true)
      })
    }
  }
  const onInputChange = (event: FormEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [event.currentTarget.name]: event.currentTarget.value,
    })
    setInvalidCreds(false)
  }

  return (
    <form
      className='needs-validation'
      onSubmit={submitHandler}
      noValidate
    >
      <MDBContainer>
        <MDBRow center className='mt-5'>
          <MDBCol md='5'>
            <MDBCard>
              <div className='header pt-3 grey lighten-2'>
                <MDBRow className='d-flex justify-content-start'>
                  <h3 className='deep-grey-text mt-3 mb-4 pb-1 mx-5'>
                    Log in
                  </h3>
                </MDBRow>
              </div>
              {invalidCreds && (
                <div className="text-danger pt-3 pl-3">
                  Invalid credentials.
                </div>
              )}
              <MDBCardBody className='mx-4 mt-4'>
                <MDBInput
                  label='Username'
                  name='username'
                  onChange={onInputChange}
                  required
                  type='text'
                  value={credentials.username}
                />
                <MDBInput
                  containerClass='mb-0'
                  label='Your password'
                  name='password'
                  onChange={onInputChange}
                  required
                  type='password'
                  value={credentials.password}
                />
                <p className='font-small grey-text d-flex justify-content-end'>
                  Forgot
                  <a
                    onClick={() => alert('Not implemented!')}
                    className='dark-grey-text font-weight-bold ml-1'
                  >
                    Password?
                  </a>
                </p>
                <div className='text-center mb-4 mt-5'>
                  <MDBBtn
                    color='danger'
                    type='submit'
                    className='btn-block z-depth-2'
                  >
                    Log in
                  </MDBBtn>
                </div>
                <p className='font-small grey-text d-flex justify-content-center'>
                  Don't have an account?
                  <a
                    onClick={() => alert('Not implemented!')}
                    className='dark-grey-text font-weight-bold ml-1'
                  >
                    Sign up
                  </a>
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </form>
  )
}

export default Login
