import { ParsedRequest, Template, FileType } from '../api/_lib/types'
const { H, R, copee } = window as any
let timeout = -1

interface ImagePreviewProps {
  src: string
  onclick: () => void
  onload: () => void
  onerror: () => void
  loading: boolean
}

const ImagePreview = ({
  src,
  onclick,
  onload,
  onerror,
  loading,
}: ImagePreviewProps) => {
  const style = {
    filter: loading ? 'blur(5px)' : '',
    opacity: loading ? 0.1 : 1,
  }
  const title = 'Click to copy image URL to clipboard'
  return H(
    'a',
    { className: 'image-wrapper', href: src, onclick },
    H('img', { src, onload, onerror, style, title })
  )
}

interface DropdownOption {
  text: string
  value: string
}

interface DropdownProps {
  options: DropdownOption[]
  value: string
  disabled: boolean
  onchange: (val: string) => void
  small: boolean
}

const Dropdown = ({
  options,
  value,
  onchange,
  small,
  disabled,
}: DropdownProps) => {
  const wrapper = small ? 'select-wrapper small' : 'select-wrapper'
  const arrow = small ? 'select-arrow small' : 'select-arrow'
  return H(
    'div',
    { className: wrapper },
    H(
      'select',
      { disabled, onchange: (e: any) => onchange(e.target.value) },
      options.map((o) =>
        H('option', { value: o.value, selected: value === o.value }, o.text)
      )
    ),
    H('div', { className: arrow }, '▼')
  )
}

interface TextInputProps {
  value: string
  placeholder: string
  disabled: boolean
  oninput: (val: string) => void
}

const TextInput = ({
  value,
  placeholder,
  oninput,
  disabled,
}: TextInputProps) => {
  return H(
    'div',
    { className: 'input-outer-wrapper' },
    H(
      'div',
      { className: 'input-inner-wrapper' },
      H('input', {
        type: 'text',
        value,
        placeholder,
        disabled,
        oninput: (e: any) => oninput(e.target.value),
      })
    )
  )
}

interface FieldProps {
  label: string
  input: any
}

const Field = ({ label, input }: FieldProps) => {
  return H(
    'div',
    { className: 'field' },
    H(
      'label',
      H('div', { className: 'field-label' }, label),
      H('div', { className: 'field-value' }, input)
    )
  )
}

interface ToastProps {
  show: boolean
  message: string
}

const Toast = ({ show, message }: ToastProps) => {
  const style = { transform: show ? 'translate3d(0,-0px,-0px) scale(1)' : '' }
  return H(
    'div',
    { className: 'toast-area' },
    H(
      'div',
      { className: 'toast-outer', style },
      H(
        'div',
        { className: 'toast-inner' },
        H('div', { className: 'toast-message' }, message)
      )
    )
  )
}

const templateOptions: DropdownOption[] = [
  { text: 'Site', value: 'site' },
  { text: 'Blog', value: 'blog' },
  { text: 'Docs', value: 'docs' },
  { text: 'Learn', value: 'learn' },
]

const fileTypeOptions: DropdownOption[] = [
  { text: 'PNG', value: 'png' },
  { text: 'JPEG', value: 'jpeg' },
]

const fontSizeOptions: DropdownOption[] = Array.from({ length: 10 })
  .map((_, i) => i * 25)
  .filter((n) => n > 0)
  .map((n) => ({ text: n + 'px', value: n + 'px' }))

const widthOptions = [
  { text: 'width', value: 'auto' },
  { text: 'auto', value: 'auto' },
  { text: '50px', value: '50' },
  { text: '100px', value: '100' },
  { text: '150px', value: '150' },
  { text: '200px', value: '200' },
  { text: '250px', value: '250' },
  { text: '300px', value: '300' },
  { text: '350px', value: '350' },
  { text: '400px', value: '400' },
  { text: '450px', value: '450' },
]

const heightOptions = [
  { text: 'height', value: 'auto' },
  { text: 'auto', value: 'auto' },
  { text: '50px', value: '50' },
  { text: '100px', value: '100' },
  { text: '150px', value: '150' },
  { text: '200px', value: '200' },
  { text: '250px', value: '250' },
  { text: '300px', value: '300' },
  { text: '350px', value: '350' },
  { text: '400px', value: '400' },
  { text: '450px', value: '450' },
]

interface AppState extends ParsedRequest {
  loading: boolean
  showToast: boolean
  messageToast: string
  selectedImageIndex: number
  width: string
  height: string
}

type SetState = (state: Partial<AppState>) => void

const App = (_: any, state: AppState, setState: SetState) => {
  const setLoadingState = (newState: Partial<AppState>) => {
    window.clearTimeout(timeout)
    setState({ ...newState, loading: true })
  }
  const {
    fileType = 'png',
    fontSize = '50px',
    template = 'docs',
    titleText = 'Scraping & asserting on a page',
    breadcrumbsText = 'Checkly Docs / Headless Automation / Basics Debugging',
    image = '',
    width = '',
    height = '',
    showToast = false,
    messageToast = '',
    loading = true,
  } = state
  const url = new URL(window.location.origin)
  url.pathname = `${template}.${fileType}`
  url.searchParams.append('titleText', encodeURIComponent(titleText))
  breadcrumbsText &&
    url.searchParams.append(
      'breadcrumbsText',
      encodeURIComponent(breadcrumbsText)
    )
  url.searchParams.append('template', template)
  url.searchParams.append('fontSize', fontSize)
  image && url.searchParams.append('image', image)
  width && url.searchParams.append('width', width)
  height && url.searchParams.append('height', height)

  return H(
    'div',
    { className: 'split' },
    H(
      'div',
      { className: 'pull-left' },
      H(
        'div',
        H(Field, {
          label: 'Template',
          input: H(Dropdown, {
            options: templateOptions,
            value: template,
            onchange: (val: Template) => setLoadingState({ template: val }),
          }),
        }),
        H(Field, {
          label: 'File Type',
          input: H(Dropdown, {
            options: fileTypeOptions,
            value: fileType,
            onchange: (val: FileType) => setLoadingState({ fileType: val }),
          }),
        }),
        H(Field, {
          label: 'Font Size',
          input: H(Dropdown, {
            options: fontSizeOptions,
            value: fontSize,
            onchange: (val: string) => setLoadingState({ fontSize: val }),
          }),
        }),
        H(Field, {
          label: 'Title Text',
          input: H(TextInput, {
            value: titleText,
            oninput: (val: string) => {
              console.log('oninput ' + val)
              setLoadingState({ titleText: val })
            },
          }),
        }),
        H(Field, {
          label: 'Breadcrumbs',
          input: H(TextInput, {
            value: breadcrumbsText,
            oninput: (val: string) => {
              console.log('oninput ' + val)
              setLoadingState({ breadcrumbsText: val })
            },
          }),
        }),
        H(Field, {
          label: 'Blog Image',
          input: H(
            'div',
            H(TextInput, {
              value: '',
              disabled: state.template !== 'blog',
              placeholder: 'image url',
              onchange: (val: string) => {
                setLoadingState({ image: val })
              },
            }),
            H(
              'div',
              { className: 'field-flex' },
              H(Dropdown, {
                options: widthOptions,
                value: width,
                disabled: state.template !== 'blog',
                small: true,
                onchange: (val: string) => {
                  setLoadingState({ width: val })
                },
              }),
              H(Dropdown, {
                options: heightOptions,
                value: height,
                disabled: state.template !== 'blog',
                small: true,
                onchange: (val: string) => {
                  setLoadingState({ height: val })
                },
              })
            )
          ),
        })
      )
    ),
    H(
      'div',
      { className: 'pull-right' },
      H(ImagePreview, {
        src: url.href,
        loading: loading,
        onload: () => setState({ loading: false }),
        onerror: (err: any) => {
          console.error(err)
          setState({ showToast: true, messageToast: 'Oops, an error occurred' })
          setTimeout(() => setState({ showToast: false }), 2000)
        },
        onclick: (e: Event) => {
          e.preventDefault()
          const success = copee.toClipboard(url.href)
          if (success) {
            setState({
              showToast: true,
              messageToast: 'Copied image URL to clipboard',
            })
            setTimeout(() => setState({ showToast: false }), 3000)
          } else {
            window.open(url.href, '_blank')
          }
          return false
        },
      }),
      H(
        'div',
        { className: 'image-hint' },
        'click image to copy generated url!'
      )
    ),
    H(Toast, {
      message: messageToast,
      show: showToast,
    })
  )
}

R(H(App), document.getElementById('app'))
