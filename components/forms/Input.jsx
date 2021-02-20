import React from 'react'
import { TickIcon } from '../svg'
function Input({
  placeholder,
  value,
  setValue,
  label,
  name,
  id,
  type,
  card,
  success,
}) {
  return (
    <div className='input_container'>
      {label ? <label htmlFor='input'>{label}</label> : ''}
      <input
        type={type || 'text'}
        placeholder={placeholder || ''}
        className={card ? 'expire' : ''}
        // className='success'
      />
      {/* {true ? <TickIcon /> : ''} */}
    </div>
  )
}

export default Input
