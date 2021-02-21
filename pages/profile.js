import React from 'react'
import ProfileDetails from '../components/profile/ProfileDetails'
import SEO from '../components/SEO'
import Header from '../components/header/Header'
import { fetchMultipleUrls } from '../utils/fetchMultipleUrls'
import { parseCookies } from 'nookies'
function profile({ user }) {
  console.log(user)
  return (
    <>
      <SEO title='Профиль' />
      <Header />
      <ProfileDetails user={user?.customer} />
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { userId } = await parseCookies(ctx)
  if (!userId) {
    const { res } = ctx
    res.setHeader('location', '/login')
    res.statusCode = 302
    res.end()
    return
  }
  const urls = [`${process.env.GET_USER_BY_ID_API_URL}${userId}`]
  const [user] = await fetchMultipleUrls(urls)
  console.log(urls)
  return {
    props: {
      user,
    },
  }
}

export default profile
