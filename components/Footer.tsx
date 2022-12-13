const Footer = () => (
  <div className='center'>
    <h2>What is this?</h2>
    <p>
      This is a service that generates dynamic{' '}
      <a href='http://ogp.me'>Open Graph</a> images that you can embed in your{' '}
      <code>&lt;meta&gt;</code> tags.
    </p>
    <p>
      For each keystroke, headless chromium is used to render an HTML page and
      take a screenshot of the result which gets cached.
    </p>
    <p>
      Find out how this works and deploy your own image generator by visiting{' '}
      <a href='https://github.com/vercel/og-image'>GitHub</a>.
    </p>
    <footer>
      Proudly hosted on <a href='https://vercel.com'>▲Vercel</a>
    </footer>
  </div>
)

export default Footer
