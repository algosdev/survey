import Button from '../components/forms/Button'
import Input from '../components/forms/Input'
import Header from '../components/header/Header'
import SEO from '../components/SEO'
import SurveysContainer from '../components/surveys/SurveysContainer'
import { parseCookies } from 'nookies'
export default function Home() {
  return (
    <>
      <SEO />
      <Header />
      <SurveysContainer />
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
  return {
    props: {
      userId: userId || '',
    },
  }
}
