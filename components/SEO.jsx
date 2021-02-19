import Head from 'next/head'

export default function SEO({ title, description, image, keywords }) {
  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <title>{title ? `${title} | Survey` : `Survey`}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <meta property='og:type' content='website' />
      <meta
        property='og:title'
        content={title ? `${title} | Survey` : `Survey`}
        key='ogtitle'
      />
      <meta property='og:description' content={description} key='ogdesc' />
      <meta property='og:site_name' content='Survey' key='ogsitename' />
      <meta
        property='og:image'
        content={image || '/favicon.svg'}
        key='ogimage'
      />
      <meta name='theme-color' content='#10272f' />
      <meta name='twitter:card' content='summary' />
      <meta
        name='twitter:title'
        content={title ? `${title} | Survey` : `Survey`}
      />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:site' content='Survey' />
      <meta name='twitter:creator' content='DeveloperBoy' />
      <meta name='twitter:image' content={image || 'images/background.jpg'} />
      <link rel='icon' href='/favicon.svg' />
    </Head>
  )
}
