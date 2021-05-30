import Head from 'next/head';

import Playground from 'components/playground';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <main className="mx-6 my-16">
      <Head>
        <title>Open Graph Image as a Service</title>
        <meta
          name="og:image"
          content="/api/og-image.png?text=Open%20Graph%20Image%20as%20a%20Service"
        />
      </Head>

      <h1 className="text-5xl text-center">
        Open Graph Image <br /> as a Service
      </h1>

      <Playground />

      <section className="mx-auto max-w-prose">
        <h2 className="text-3xl">What is this?</h2>
        <p>
          This is a service that generates dynamic{' '}
          <a href="http://ogp.me" target="_blank" rel="noopener noreferrer">
            Open Graph
          </a>{' '}
          images that you can embed in your <code>&lt;meta&gt;</code> tags.
        </p>
        <p>
          For each keystroke, headless chromium is used to render an HTML page
          and take a screenshot of the result which gets cached.
        </p>
        <p>
          Find out how this works and deploy your own image generator by
          visiting{' '}
          <a
            href="https://github.com/vercel/og-image"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </section>

      <hr className="mx-auto my-8 max-w-prose" />

      <footer className="mx-auto my-4 text-center max-w-prose">
        Proudly hosted on{' '}
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          ▲Vercel
        </a>
      </footer>
    </main>
  );
};

export default Home;
