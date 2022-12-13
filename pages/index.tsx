import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react'
import Dropdown, { DropdownOption } from '../components/Dropdown'
import Field from '../components/Field'
import ImagePreview from '../components/ImagePreview'
import TextInput from '../components/TextInput'

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

const fileTypeOptions: DropdownOption[] = [
  { text: 'PNG', value: 'png' },
  { text: 'JPEG', value: 'jpeg' },
]

const fontSizeOptions: DropdownOption[] = Array.from({ length: 10 })
  .map((_, i) => i * 25)
  .filter((n) => n > 0)
  .map((n) => ({ text: n + 'px', value: n + 'px' }))

const markdownOptions: DropdownOption[] = [
  { text: 'Plain Text', value: '0' },
  { text: 'Markdown', value: '1' },
]

// TODO: FIELDS object to map over

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [theme, setTheme] = useState('light')
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [widths, setWidths] = useState([])
  const [heights, setHeights] = useState([])
  const [overrideUrl, setOverrideUrl] = useState(null)
  const [url, setUrl] = useState(new URL(window.location.origin))
  const [fileType, setFileType] = useState('png')
  const [fontSize, setFontSize] = useState('100px')
  const [images, setImages] = useState([imageOptions[0].value])

  const [textSettings, setTextSettings] = useState({
    fontSize: '100px',
    isMarkdown: true,
    text: '**Hello** World',
  })

  //   const setLoadingState = (newState: Partial<AppState>) => {
  //     window.clearTimeout(timeout)
  //     if (state.overrideUrl && state.overrideUrl !== newState.overrideUrl) {
  //       newState.overrideUrl = state.overrideUrl
  //     }
  //     if (newState.overrideUrl) {
  //       timeout = window.setTimeout(() => setState({ overrideUrl: null }), 200)
  //     }

  //     setState({ ...newState, loading: true })
  //   }

  // TODO: Add texts array to add in N text nodes

  useEffect(() => {
    const tempUrl = url
    tempUrl.pathname = `${encodeURIComponent(textSettings.text)}.${fileType}`
    tempUrl.searchParams.append('theme', theme)
    tempUrl.searchParams.append('md', textSettings.isMarkdown ? '1' : '0')
    tempUrl.searchParams.append('fontSize', fontSize)

    for (const image of images) {
      tempUrl.searchParams.append('images', image)
    }

    for (let width of widths) {
      tempUrl.searchParams.append('widths', width)
    }
    for (let height of heights) {
      tempUrl.searchParams.append('heights', height)
    }
  }, [])

  const onThemeChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selectedTheme = e.currentTarget.value
    setTheme(selectedTheme)
  }

  const onFileTypeChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selectedFileType = e.currentTarget.value
    setFileType(selectedFileType)
  }

  const onTextFontSizeChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selectedFontSize = e.currentTarget.value
    setTextSettings((prev) => ({ ...prev, fontSize: selectedFontSize }))
  }

  const onTextTypeChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const isMarkdown = e.currentTarget.value === '1'
    setTextSettings((prev) => ({ ...prev, isMarkdown }))
  }

  const onTextInputChange: FormEventHandler<HTMLInputElement> = (e) => {
    const textInput = e.currentTarget.value
    setTextSettings((prev) => ({ ...prev, text: textInput }))
  }

  return (
    <div className='split'>
      <div className='pull-left'>
        <div>
          <Field
            label='Theme'
            input={
              <Dropdown
                options={themeOptions}
                value={theme}
                onChange={onThemeChange}
              />
            }
          />
          <Field
            label='File Type'
            input={
              <Dropdown
                options={fileTypeOptions}
                value={fileType}
                onChange={onFileTypeChange}
              />
            }
          />
          <Field
            label='Font Size'
            input={
              <Dropdown
                options={fontSizeOptions}
                value={textSettings.fontSize}
                onChange={onTextFontSizeChange}
              />
            }
          />
          <Field
            label='Text Type'
            input={
              <Dropdown
                options={markdownOptions}
                value={textSettings.isMarkdown ? '1' : '0'}
                onChange={onTextTypeChange}
              />
            }
          />
          <Field
            label='Text Input'
            input={
              <TextInput
                value={textSettings.text}
                onInput={onTextInputChange}
              />
            }
          />
        </div>
      </div>
      <div className='pull-right'>
        <ImagePreview
          src={overrideUrl ? overrideUrl.href : url.href}
          loading={loading}
          onLoad={() => setLoading(false)}
          onError={() => {
            setShowToast(true)
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
    
    const {
        fileType = 'png',
        fontSize = '100px',
        theme = 'light',
        md = true,
        text = '**Hello** World',
        images=[imageLightOptions[0].value],
        widths=[],
        heights=[],
        showToast = false,
        messageToast = '',
        loading = true,
        selectedImageIndex = 0,
        overrideUrl = null,
    } = state;

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
