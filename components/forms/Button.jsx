import React from 'react'

function Button({ text, variant, onClick, type, isLoading, success }) {
  return (
    <button
      type={type || 'submit'}
      onClick={onClick}
      className={`btn ${variant || 'primary'}`}
    >
      {text}
    </button>
  )
}

export default Button
