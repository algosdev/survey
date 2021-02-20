import React from 'react'
import Button from './Button'
import cls from './form.module.scss'
import Input from './Input'
import { Router } from '../../i18n'
function LoginForm() {
  const handleSubmit = (e) => {
    e.preventDefault()
    Router.push('/')
  }
  return (
    <div className={cls.form_container}>
      <p className='heading1'>Войти</p>
      <form className={cls.form} onSubmit={handleSubmit}>
        <Input placeholder='Введите номер телефона' label='Номер телефона' />
        <Input placeholder='Введите пароль' label='Пароль' />
        <div className={cls.actions}>
          <Button text='Продолжить' />
        </div>
      </form>
    </div>
  )
}

export default LoginForm
