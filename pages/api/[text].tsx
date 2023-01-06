import { ImageResponse } from '@vercel/og'
// import { marked } from 'marked'
import type { NextRequest } from 'next/server'
import { Fragment } from 'react'

export const config = {
  runtime: 'experimental-edge',
}

/**
 * Encrypted Example:
 * https://vercel.com/docs/concepts/functions/edge-functions/og-image-examples#encrypting-parameters
 */

// TODO: Markdown conversion.

function generateImage(
  src: string,
  idx: number,
  width = 'auto',
  height = '225'
) {
  return (
    <img
      key={src}
      src={src}
      style={{ margin: '0 75px' }}
      alt='Generated Image'
      width={width}
      height={height}
    />
  )
}

export default function (req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const theme = searchParams.get('theme')
  const text = searchParams.get('text')
  // const isMarkdown = searchParams.get('md') === '1'
  const fontSize = searchParams.get('fontSize')

  const images = searchParams.getAll('images')
  const widths = searchParams.getAll('widths')
  const heights = searchParams.getAll('heights')

  console.log(generateImage(images[0], 0))

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          backgroundColor: 'white',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          filter: theme === 'dark' ? 'invert(1)' : 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            justifyItems: 'center',
          }}
        >
          {/* <svg
            height={80}
            viewBox='0 0 75 65'
            fill='black'
            style={{ margin: '0 75px' }}
          >
            <path d='M37.59.25l36.95 64H.64l36.95-64z'></path>
          </svg> */}
          {images.map((src, i) => generateImage(src, i, widths[i], heights[i]))}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize,
            fontStyle: 'normal',
            color: 'black',
            marginTop: 30,
            lineHeight: 1.8,
            whiteSpace: 'pre-wrap',
          }}
        >
          {text}
        </div>
      </div>
    )
  )
}
