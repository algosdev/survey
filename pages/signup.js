import React from 'react'
import SignupForm from '../components/forms/SignupForm'
import SEO from '../components/SEO'
import { useRouter } from 'next/router'
import SignupFormEmail from "../components/forms/SignupFormEmail"
// import Header from '../components/header/Header'
function signup() {
  const router = useRouter()
  return (
    <>
      <SEO title='Регистрация' />
      {router.query.email ? <SignupFormEmail /> : <SignupForm />}
    </>
  )
}

export default signup
