import Head from 'next/head'

import '../styles/style.css'
import Layout from '../components/Layout'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>react-md with next.js</title>
        <meta charSet='utf-8' />
        <meta httpEquiv='x-ua-compatible' content='ie=edge' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@vercel' />
        <meta property='og:site_name' content='Open Graph Image as a Service' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Open Graph Image as a Service' />
        <meta property='og:locale' content='en' />
        <meta property='og:url' content='https://og-image.vercel.app' />
        <link rel='canonical' href='https://og-image.vercel.app' />
        <meta
          name='description'
          content='A service to generate dynamic Open Graph images on-the-fly for the purpose of sharing a website to social media. Proudly hosted on Vercel.'
        />
        <meta
          property='og:description'
          content='A service to generate dynamic Open Graph images on-the-fly for the purpose of sharing a website to social media. Proudly hosted on Vercel.'
        />
        <meta
          property='og:image'
          content='https://og-image.vercel.app/Open%20Graph%20Image%20as%20a%20Service.png?theme=light&amp;md=1&amp;fontSize=95px&amp;images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fzeit-black-triangle.svg'
        />
        <title>Open Graph Image as a Service</title>
        <meta name='viewport' content='width=device-width, maximum-scale=1.0' />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
