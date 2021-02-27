import { useState, useEffect } from 'react'
import { TickIcon } from '../svg'
import InputMask from 'react-input-mask'
function InputEmail({
  placeholder,
  value,
  onChange,
  label,
  name,
  type,
  expire,
  disabled,
  error,
}) {
  const [isValid, setIsValid] = useState(false)
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  useEffect(() => {
    if (validateEmail(value)) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  })

  return (
    <div className='input_container'>
      {label && (
        <label htmlFor={name} className={`${error && 'error'}`}>
          {label}
        </label>
      )}
      <input
        type='text'
        placeholder={placeholder || ''}
        value={value}
        name={name}
        required
        onChange={onChange}
        disabled={disabled}
        className={`${isValid && !error && 'success'} ${expire && 'expire'} ${
          error && 'error'
        }`}
      />
      {isValid && !error && type !== 'date' ? <TickIcon /> : ''}
    </div>
  )
}

export default InputEmail
