import { FormEventHandler } from 'react'

interface TextInputProps {
  value: string
  onInput: FormEventHandler<HTMLInputElement>
  small?: boolean
  placeholder?: string
  type?: string
}

const TextInput = ({
  value,
  onInput,
  small = false,
  type = 'text',
  placeholder = '',
}: TextInputProps) => {
  return (
    <div className={'input-outer-wrapper' + (small ? ' small' : '')}>
      <div className='input-inner-wrapper'>
        <div>
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            onInput={onInput}
          />
        </div>
      </div>
    </div>
  )
}

export default TextInput
