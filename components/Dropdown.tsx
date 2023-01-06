import type { ChangeEventHandler } from 'react'

export interface DropdownOption {
  text: string
  value: string
}

interface DropdownProps {
  options: DropdownOption[]
  value: string
  onChange: ChangeEventHandler<HTMLSelectElement>
  small?: boolean
}

const Dropdown = ({
  options,
  value,
  onChange,
  small = false,
}: DropdownProps) => {
  const wrapper = small ? 'select-wrapper small' : 'select-wrapper'
  const arrow = small ? 'select-arrow small' : 'select-arrow'

  return (
    <div className={wrapper}>
      <select onChange={onChange} value={value}>
        {options.map((option) => (
          <option
            key={option.text}
            value={option.value}
            // selected={value === option.value}
          >
            {option.text}
          </option>
        ))}
      </select>
      <div className={arrow}>▼</div>
    </div>
  )
}

export default Dropdown
