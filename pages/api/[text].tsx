import { ImageResponse } from '@vercel/og'
import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

// Potentially added features:
// Customize background = color picker, gradients
// Different "templates"

// Encrypted example = https://vercel.com/docs/concepts/functions/edge-functions/og-image-examples#encrypting-parameters

export default function (req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const theme = searchParams.get('theme')
  const text = searchParams.get('text')
  const isMarkdown = searchParams.get('md')
  const fontSize = searchParams.get('fontSize')

  const images = searchParams.getAll('images')
  const widths = searchParams.getAll('widths')
  const heights = searchParams.getAll('heights')

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
          filter: theme === 'dark' && 'invert(1)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            height={80}
            viewBox='0 0 75 65'
            fill='black'
            style={{ margin: '0 75px' }}
          >
            <path d='M37.59.25l36.95 64H.64l36.95-64z'></path>
          </svg>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 40,
            fontStyle: 'normal',
            color: 'black',
            marginTop: 30,
            lineHeight: 1.8,
            whiteSpace: 'pre-wrap',
          }}
        >
          <b>{text}</b>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  )
}
