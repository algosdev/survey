import React from 'react'
import Button from './Button'
import cls from './form.module.scss'
import Input from './Input'
import Select from './Select'
import { Router } from '../../i18n'
function BonusForm() {
  const handleSubmit = (e) => {
    e.preventDefault()
    Router.push('/bonus-success')
  }
  return (
    <div className={cls.form_container}>
      <p className='heading1'>Получить бонус</p>
      <form className={cls.form} onSubmit={handleSubmit}>
        <Select
          placeholder='Выберите пол'
          options={[
            { display: 'Мужской', value: 'male' },
            { display: 'Женский', value: 'female' },
          ]}
        />
        <Input placeholder='Выберите дата рождения' type='date' />
        <Select
          placeholder='Выберите ваш национальност'
          options={[
            { display: 'Узбек', value: 'uzbek' },
            { display: 'Русский', value: 'russian' },
            { display: 'Казак', value: 'kazakh' },
          ]}
        />
        <Select
          placeholder='Выберите семейное положение'
          options={[
            { display: 'Холост / не замужем', value: 'single' },
            { display: 'Женат / замужем', value: 'married' },
            { display: 'Разведен / разведена', value: 'devorced' },
            { display: 'Вдовец / вдова', value: 'widow' },
          ]}
        />
        <Select
          placeholder='Количество детей'
          options={[
            { display: 'Нет', value: 'no' },
            { display: '1', value: '1' },
            { display: '2', value: '2' },
            { display: '3', value: '3' },
            { display: ' 5 и более', value: 'more' },
          ]}
        />
        <Input placeholder='Введите рабочая места' label='Рабочая места' />
        <Button text='Продолжить' />
      </form>
    </div>
  )
}

export default BonusForm
