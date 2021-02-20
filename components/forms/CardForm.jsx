import React from 'react'
import Button from './Button'
import cls from './form.module.scss'
import Input from './Input'
import { Router } from '../../i18n'
function CardForm() {
  const handleSubmit = (e) => {
    e.preventDefault()
    Router.push('/')
  }
  return (
    <div className={cls.form_container}>
      <p className='heading1'>Прикрепить карту</p>
      <form className={cls.form} onSubmit={handleSubmit}>
        <Input placeholder='Введите имя' label='Владелец карты' />
        <Input placeholder='Введите номер карты' label='Номер карты' />
        <Input placeholder='ММ/ГГ' label='Срок действия' card />
        <div className={cls.actions}>
          <Button text='Продолжить' />
        </div>
      </form>
    </div>
  )
}

export default CardForm
