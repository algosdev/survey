import React from 'react'
import Button from './Button'
import cls from './form.module.scss'
import Input from './Input'
function LoginForm() {
  return (
    <div className={cls.form_container}>
      <p className='heading1'>Войти</p>
      <form className={cls.form}>
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
