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
}) {
  const [isValid, setIsValid] = useState(false)
  const validateByType = () => {
    switch (type) {
      case 'text':
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
          className={type === 'date' ? (value ? 'none' : 'date') : ''}
        >
          {label}
        </label>
      ) : (
        ''
      )}
      {type === 'tel' || type === 'number' ? (
        <InputMask
          mask={
            otp
              ? '9 9 9 9 9 9'
              : card
              ? '9999 9999 9999 9999'
              : expire
              ? '99/99'
              : '+\\9\\9\\8 99 999 99 99'
          }
          maskChar={null}
          type={type || 'text'}
          placeholder={placeholder || ''}
          className={expire ? 'expire' : ''}
          value={value}
          name={name}
          onChange={onChange}
          className={isValid ? 'success' : ''}
        />
      ) : (
        <input
          type={type || 'text'}
          placeholder={placeholder || ''}
          className={expire ? 'expire' : ''}
          value={value}
          name={name}
          onChange={onChange}
          format=''
          className={isValid ? 'success' : ''}
        />
      )}
      {isValid && type !== 'date' ? <TickIcon /> : ''}
    </div>
  )
}

export default Input
