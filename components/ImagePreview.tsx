interface ImagePreviewProps {
  src: string
  onClick: () => void
  onLoad: () => void
  onError: () => void
  loading: boolean
}

const TITLE = 'Click to copy image URL to clipboard'

const ImagePreview = ({
  src,
  onClick,
  onLoad,
  onError,
  loading,
}: ImagePreviewProps) => {
  const style = {
    filter: loading ? 'blur(5px)' : '',
    opacity: loading ? 0.1 : 1,
  }

  return (
    <a className='image-wrapper' href={src} onClick={onClick}>
      <img
        src={src}
        onLoad={onLoad}
        onError={onError}
        style={style}
        title={TITLE}
      />
    </a>
  )
}

export default ImagePreview
