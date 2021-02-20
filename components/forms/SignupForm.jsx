import React from 'react'
import Button from './Button'
import cls from './form.module.scss'
import Input from './Input'
import { Router } from '../../i18n'
function SignupForm() {
  return (
    <div className={cls.form_container}>
      <p className='heading1'>Регистрация</p>
      <form className={cls.form}>
        <Input placeholder='Введите имя' label='Имя' />
        <Input placeholder='Введите фамилия' label='Фамилия' />
        <p className={cls.extra}>
          Вы сможете заполнить дополнительные данные и получить бонус
        </p>
        <div className={cls.actions}>
          <Button
            text='Пропустит'
            variant='secondary'
            type='button'
            onClick={() => Router.push('/')}
          />
          <Button
            type='button'
            text='Продолжить'
            onClick={() => Router.push('/bonus')}
          />
        </div>
      </form>
    </div>
  )
}

export default SignupForm
