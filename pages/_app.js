import '../styles/globals.css'
import NProgress from 'nprogress'
import Router from 'next/router'
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => {
  NProgress.done()
  scrollTop()
})

Router.events.on('routeChangeError', () => NProgress.done())
function scrollTop() {
  if (window) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
