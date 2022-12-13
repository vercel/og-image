interface ToastProps {
  show: boolean
  message: string
}

const Toast = ({ show, message }: ToastProps) => {
  const style = { transform: show ? 'translate3d(0,-0px,-0px) scale(1)' : '' }

  return (
    <div className='toast-area'>
      <div className='toast-outer' style={style}>
        <div className='toast-inner'>
          <div className='toast-message'>{message}</div>
        </div>
      </div>
    </div>
  )
}

export default Toast
