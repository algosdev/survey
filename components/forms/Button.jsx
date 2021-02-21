import React from 'react'
import cls from './form.module.scss'
function Button({ text, variant, onClick, type, isLoading, success, small }) {
  return (
    <button
      type={type || 'submit'}
      onClick={onClick}
      className={`btn ${variant || 'primary'} ${small && 'small'}`}
    >
      {isLoading ? (
        <div className={cls.loading_bar_spinner}>
          <div className={cls.spinner_icon}></div>
        </div>
      ) : (
        text
      )}
    </button>
  )
}

export default Button
