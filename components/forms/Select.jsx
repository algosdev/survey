import React, { useState, useEffect } from 'react'
import { TickIcon } from '../svg'
function Select({ placeholder, value, onChange, label, name, options, type }) {
  const [isValid, setIsValid] = useState(false)
  useEffect(() => {
    if (value !== 'none') {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [value])
  return (
    <div className='input_container select'>
      <label htmlFor={name}>{label}</label>
      <select
        type={type || 'text'}
        placeholder={placeholder || ''}
        className={isValid ? 'success' : ''}
        name={name}
        value={value}
        onChange={onChange}
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
