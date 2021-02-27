import React from 'react'
import LoginForm from '../components/forms/LoginForm'
import SEO from '../components/SEO'
import LoginFormEmail from '../components/forms/LoginFormEmail'
import { useRouter } from 'next/router'
// import Header from '../components/header/Header'
function login() {
  const router = useRouter()
  return (
    <>
      <SEO title='Логин' />
      {router.query.email ? <LoginFormEmail /> : <LoginForm />}
    </>
  )
}

export default login
