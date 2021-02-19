import React, { useState } from 'react'
import { TickIcon } from '../svg'
function Select({
  placeholder,
  value,
  setValue,
  label,
  name,
  id,
  type,
  success,
}) {
  const [openSelect, setOpenSelect] = useState(false)
  return (
    <div className='input_container select'>
      <label htmlFor='input'>{label}</label>
      <select
        type={type || 'text'}
        placeholder={placeholder || ''}
        className='success'
        id='input'
        onClick={() => setOpenSelect(true)}
      >
        {openSelect ? '' : <option>1</option>}
        <option>2</option>
        <option>3</option>
      </select>
      {true ? <TickIcon /> : ''}
    </div>
  )
}

export default Select
