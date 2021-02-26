import { useState, useEffect } from 'react'
import { TickIcon } from '../svg'
import InputMask from 'react-input-mask'
function Input({
  placeholder,
  value,
  onChange,
  label,
  name,
  type,
  card,
  otp,
  expire,
  phone,
  disabled,
  error,
}) {
  const [isValid, setIsValid] = useState(false)
  const validateByType = () => {
    switch (type) {
      case 'text':
        value !== 'none' && value?.length ? setIsValid(true) : setIsValid(false)
        break
      case 'date':
        value !== 'none' && value ? setIsValid(true) : setIsValid(false)
        break
      case 'tel':
        otp
          ? value?.length === 11
            ? setIsValid(true)
            : setIsValid(false)
          : card
          ? value?.length === 19
            ? setIsValid(true)
            : setIsValid(false)
          : expire
          ? value?.length === 5
            ? setIsValid(true)
            : setIsValid(false)
          : phone
          ? value?.length === 17
            ? setIsValid(true)
            : setIsValid(false)
          : setIsValid(false)
        break
      default:
        setIsValid(false)
        break
    }
  }
  useEffect(() => {
    validateByType()
    console.log(value)
  })

  return (
    <div className='input_container'>
      {label ? (
        <label
          htmlFor={name}
          className={`${type === 'date' && (value ? 'none' : 'date')} ${
            error && 'error'
          }`}
        >
          {label}
        </label>
      ) : (
        ''
      )}
      <input
        type={'text'}
        placeholder={placeholder || ''}
        value={value}
        name={name}
        required
        onChange={onChange}
        disabled={disabled}
        format=''
        className={`${isValid && !error && 'success'} ${expire && 'expire'} ${
          error && 'error'
        }`}
      />
      {isValid && !error && type !== 'date' ? <TickIcon /> : ''}
    </div>
  )
}

export default Input
