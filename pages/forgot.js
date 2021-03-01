import React from 'react'
import LoginForm from '../components/forms/LoginForm'
import SEO from '../components/SEO'
import ForgotForm from '../components/forms/ForgotForm'
import { useRouter } from 'next/router'
// import Header from '../components/header/Header'
function forgot() {
  const router = useRouter()
  return (
    <>
      <SEO title='Забыл пароль?' />
      <ForgotForm />
    </>
  )
}

export default forgot
