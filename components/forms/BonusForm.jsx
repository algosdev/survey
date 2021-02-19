import React from 'react'
import Button from './Button'
import cls from './form.module.scss'
import Input from './Input'
function LoginForm() {
  return (
    <div className={cls.form_container}>
      <p className='heading1'>Получить бонус</p>
      <form className={cls.form}>
        <Input placeholder='Выберите пол' />
        <Input placeholder='Выберите дата рождения' />
        <Input placeholder='Выберите ваш национальност' />
        <Input placeholder='Выберите семейное положение' />
        <Input placeholder='Количество детей' />
        <Input placeholder='Введите рабочая места' label='Рабочая места' />
        <Button text='Продолжить' />
      </form>
    </div>
  )
}

export default LoginForm
