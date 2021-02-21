import { useState } from 'react'
import Button from './Button'
import cls from './form.module.scss'
import Input from './Input'
import { Router } from '../../i18n'
function CardForm() {
  const [values, setValues] = useState({ card_number: '', expire: '' })
  const handleSubmit = (e) => {
    e.preventDefault()
    Router.push('/')
  }
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  return (
    <div className={cls.form_container}>
      <p className='heading1'>Прикрепить карту</p>
      <form className={cls.form} onSubmit={handleSubmit}>
        <Input placeholder='Введите имя' label='Владелец карты' />
        <Input
          placeholder='Введите номер карты'
          label='Номер карты'
          value={values.card_number}
          onChange={handleChange}
          name='card_number'
          card
          type='tel'
        />
        <Input
          placeholder='ММ/ГГ'
          label='Срок действия'
          value={values.expire}
          onChange={handleChange}
          name='expire'
          expire
          type='tel'
        />
        <div className={cls.actions}>
          <Button text='Продолжить' />
        </div>
      </form>
    </div>
  )
}

export default CardForm
