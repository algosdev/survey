import React, { useState, useEffect } from 'react'
import { TickIcon } from '../svg'
function Select({
  placeholder,
  // value,
  // setValue,
  label,
  name,
  id,
  options,
  type,
  success,
}) {
  const [isValid, setIsValid] = useState(false)
  const [value, setValue] = useState('none')
  useEffect(() => {
    if (value !== 'none') {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [value])
  return (
    <div className='input_container select'>
      <label htmlFor='input'>{label}</label>
      <select
        type={type || 'text'}
        placeholder={placeholder || ''}
        className={isValid ? 'success' : ''}
        id='input'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {placeholder ? (
          <option disabled value='none'>
            {placeholder}
          </option>
        ) : (
          ''
        )}
        {options.map((el, index) => (
          <option value={el.value} key={index}>
            {el.display}
          </option>
        ))}
      </select>
      {isValid ? <TickIcon /> : ''}
    </div>
  )
}

export default Select
