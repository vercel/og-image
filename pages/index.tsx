import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react'
import Dropdown, { DropdownOption } from '../components/Dropdown'
import Field from '../components/Field'
import ImagePreview from '../components/ImagePreview'
import TextInput from '../components/TextInput'

/**
 * Notes:
 * - Latest version supports conversion to PNG only, not JPEG.
 */

const themeOptions: DropdownOption[] = [
  { text: 'Light', value: 'light' },
  { text: 'Dark', value: 'dark' },
]

const imageOptions: DropdownOption[] = [
  {
    text: 'Vercel',
    value:
      'https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-black.svg',
  },
  {
    text: 'Next.js',
    value:
      'https://assets.vercel.com/image/upload/front/assets/design/nextjs-black-logo.svg',
  },
  {
    text: 'Hyper',
    value:
      'https://assets.vercel.com/image/upload/front/assets/design/hyper-color-logo.svg',
  },
]

const fontSizeOptions: DropdownOption[] = Array.from({ length: 10 })
  .map((_, i) => i * 25)
  .filter((n) => n > 0)
  .map((n) => ({ text: n + 'px', value: n + 'px' }))

const markdownOptions: DropdownOption[] = [
  { text: 'Plain Text', value: '0' },
  { text: 'Markdown', value: '1' },
]

interface OGImageData {
  theme: string
  text: string
  md: boolean
  fontSize: string
  selectedImageIndex: number
  images: string[]
  widths: string[]
  heights: string[]
}

const DEFAULT_DATA = {
  theme: 'light',
  text: 'Hello World',
  md: false,
  fontSize: '100px',
  selectedImageIndex: 0,
  images: [imageOptions[0].value],
  widths: [],
  heights: [],
}

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [toastMessage, setToastMessage] = useState('')
  const [imageData, setImageData] = useState<OGImageData>(DEFAULT_DATA)
  const [url, setUrl] = useState(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    setUrl(new URL(window.location.origin))
  }, [])

  useEffect(() => {
    window.clearTimeout(timeoutRef?.current)

    const generateUrl = () => {
      const tempUrl = new URL(window.location.origin)
      tempUrl.pathname = `/api/${encodeURIComponent(imageData.text)}`
      tempUrl.searchParams.append('theme', imageData.theme)
      tempUrl.searchParams.append('md', imageData.md ? '1' : '0')
      tempUrl.searchParams.append('fontSize', imageData.fontSize)

      for (const image of imageData.images) {
        tempUrl.searchParams.append('images', image)
      }

      for (let width of imageData.widths) {
        tempUrl.searchParams.append('widths', width)
      }

      for (let height of imageData.heights) {
        tempUrl.searchParams.append('heights', height)
      }

      return tempUrl
    }

    const tempUrl = generateUrl()

    if (tempUrl && tempUrl !== url) {
      timeoutRef.current = window.setTimeout(() => {
        setLoading(true)
        setUrl(tempUrl)
      }, 500)
    }
  }, [imageData])

  const onThemeChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selectedTheme = e.currentTarget.value
    setImageData((prev) => ({ ...prev, theme: selectedTheme }))
  }

  const onTextFontSizeChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selectedFontSize = e.currentTarget.value
    setImageData((prev) => ({ ...prev, fontSize: selectedFontSize }))
  }

  const onTextTypeChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const isMarkdown = e.currentTarget.value === '1'
    setImageData((prev) => ({ ...prev, md: isMarkdown }))
  }

  const onTextInputChange: FormEventHandler<HTMLInputElement> = (e) => {
    const textInput = e.currentTarget.value
    setImageData((prev) => ({ ...prev, text: textInput }))
  }

  const onImageChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selectedImage = e.currentTarget.value
    const clone = [...imageData.images]
    clone[0] = selectedImage
    const selected = imageOptions.map((o) => o.value).indexOf(selectedImage)
    setImageData((prev) => ({
      ...prev,
      images: clone,
      selectedImageIndex: selected,
    }))
  }

  return (
    <div className='split'>
      <div className='pull-left'>
        <Field
          label='Theme'
          input={
            <Dropdown
              options={themeOptions}
              value={imageData.theme}
              onChange={onThemeChange}
            />
          }
        />
        <Field
          label='Font Size'
          input={
            <Dropdown
              options={fontSizeOptions}
              value={imageData.fontSize}
              onChange={onTextFontSizeChange}
            />
          }
        />
        <Field
          label='Text Type'
          input={
            <Dropdown
              options={markdownOptions}
              value={imageData.md ? '1' : '0'}
              onChange={onTextTypeChange}
            />
          }
        />
        <Field
          label='Text Input'
          input={
            <TextInput value={imageData.text} onInput={onTextInputChange} />
          }
        />
        <Field
          label='Image 1'
          input={
            <Dropdown
              options={imageOptions}
              value={imageOptions[imageData.selectedImageIndex].value}
              onChange={onImageChange}
            />
          }
        />
      </div>
      <div className='pull-right'>
        <ImagePreview
          src={url?.href || undefined}
          loading={loading}
          onLoad={() => setLoading(false)}
          onError={() => {
            setToastMessage('Oops, an error occurred.')
          }}
          onClick={() => console.log('Copied to clipboard.')}
        />
      </div>
    </div>
  )
}
/*
import type { ParsedRequest, Theme, FileType } from '../api/_lib/types';

let timeout = -1;

const App = (_: any, state: AppState, setState: SetState) => {

    return H('div',
        { className: 'split' },
        H('div',
            { className: 'pull-left' },
            H('div',
                
                H(Field, {
                    label: 'Image 1',
                    input: H('div',
                        H(Dropdown, {
                            options: imageOptions,
                            value: imageOptions[selectedImageIndex].value,
                            onchange: (val: string) =>  {
                                let clone = [...images];
                                clone[0] = val;
                                const selected = imageOptions.map(o => o.value).indexOf(val);
                                setLoadingState({ images: clone, selectedImageIndex: selected });
                            }
                        }),
                        H('div',
                            { className: 'field-flex' },
                            H(TextInput, {
                                value: widths[0],
                                type: 'number',
                                placeholder: 'width',
                                small: true,
                                oninput: (val: string) =>  {
                                    let clone = [...widths];
                                    clone[0] = val;
                                    setLoadingState({ widths: clone });
                                }
                            }),
                            H(TextInput, {
                                value: heights[0],
                                type: 'number',
                                placeholder: 'height',
                                small: true,
                                oninput: (val: string) =>  {
                                    let clone = [...heights];
                                    clone[0] = val;
                                    setLoadingState({ heights: clone });
                                }
                            })
                        )
                    ),
                }),
                ...images.slice(1).map((image, i) => H(Field, {
                    label: `Image ${i + 2}`,
                    input: H('div',
                        H(TextInput, {
                            value: image,
                            oninput: (val: string) => {
                                let clone = [...images];
                                clone[i + 1] = val;
                                setLoadingState({ images: clone, overrideUrl: url });
                            }
                        }),
                        H('div',
                            { className: 'field-flex' },
                            H(TextInput, {
                                value: widths[i + 1],
                                type: 'number',
                                placeholder: 'width',
                                small: true,
                                oninput: (val: string) =>  {
                                    let clone = [...widths];
                                    clone[i + 1] = val;
                                    setLoadingState({ widths: clone });
                                }
                            }),
                            H(TextInput, {
                                value: heights[i + 1],
                                type: 'number',
                                placeholder: 'height',
                                small: true,
                                oninput: (val: string) =>  {
                                    let clone = [...heights];
                                    clone[i + 1] = val;
                                    setLoadingState({ heights: clone });
                                }
                            })
                        ),
                        H('div',
                            { className: 'field-flex' },
                            H(Button, {
                                label: `Remove Image ${i + 2}`,
                                onclick: (e: MouseEvent) => {
                                    e.preventDefault();
                                    const filter = (arr: any[]) => [...arr].filter((_, n) => n !== i + 1);
                                    const imagesClone = filter(images);
                                    const widthsClone = filter(widths);
                                    const heightsClone = filter(heights);
                                    setLoadingState({ images: imagesClone, widths: widthsClone, heights: heightsClone });
                                }
                            })
                        )
                    )
                })),
                H(Field, {
                    label: `Image ${images.length + 1}`,
                    input: H(Button, {
                        label: `Add Image ${images.length + 1}`,
                        onclick: () => {
                            const nextImage = images.length === 1
                                ? 'https://cdn.jsdelivr.net/gh/remojansen/logo.ts@master/ts.svg'
                                : '';
                            setLoadingState({ images: [...images, nextImage] })
                        }
                    }),
                }),
            )
        ),
        H('div',
            { className: 'pull-right' },
            H(ImagePreview, {
                src: overrideUrl ? overrideUrl.href : url.href,
                loading: loading,
                onload: () => setState({ loading: false }),
                onerror: () => {
                    setState({ showToast: true, messageToast: 'Oops, an error occurred' });
                    setTimeout(() => setState({ showToast: false }), 2000);
                },
                onclick: (e: Event) => {
                    e.preventDefault();
                    const success = copee.toClipboard(url.href);
                    if (success) {
                        setState({ showToast: true, messageToast: 'Copied image URL to clipboard' });
                        setTimeout(() => setState({ showToast: false }), 3000);
                    } else {
                        window.open(url.href, '_blank');
                    }
                    return false;
                }
            })
        ),
        H(Toast, {
            message: messageToast,
            show: showToast,
        })
    );
};

*/
