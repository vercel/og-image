interface FieldProps {
  label: string
  input: any
}

const Field = ({ label, input }: FieldProps) => {
  return (
    <div className='field'>
      <label>
        <div className='field-label'>{label}</div>
        <div className='field-value'>{input}</div>
      </label>
    </div>
  )
}

export default Field
