import { useState } from 'react'
import Button from './Button'
import cls from './form.module.scss'
import Input from './Input'
import Select from './Select'
import { Router } from '../../i18n'
const statusOptions =  [
    { display: 'Не женат / не замужем', value: 'single' },
    { display: 'Женат (а) / проживаю в гражданском браке', value: 'married' },
    { display: 'Раведен (а)', value: 'devorced' },
    { display: 'Вдова (ец)', value: 'wnameow' },
  ]
  const numberOfChildrenOptions = [
    { display: 'Нет', value: 'no' },
    { display: '1', value: '1' },
    { display: '2', value: '2' },
    { display: '3', value: '3' },
    { display: ' 5 и более', value: 'more' },
  ]
function BonusForm() {
  const [values, setValues] = useState({
    sex: 'none',
    date_of_birth: '',
    status: 'none',
    number_of_children: 'none',
    workplace: '',
    nationality: 'none',
    position: '',
    country: 'none',
    region: 'none',
    district: 'none',
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    Router.push('/bonus-success')
  }
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  console.log(values)
  return (
    <div className={cls.form_container}>
      <p className='heading1'>Получить бонус</p>
      <form className={cls.form} onSubmit={handleSubmit}>
        {/* <Select
          placeholder='Выберите пол'
          options={[
            { display: 'Мужской', value: 'male' },
            { display: 'Женский', value: 'female' },
          ]}
          value={values.sex}
          onChange={handleChange}
          name='sex'
        />
         <Input
          label='Выберите дата рождения'
          type='date'
          value={values.date_of_birth}
          onChange={handleChange}
          name='date_of_birth'
        />
        <Select
          placeholder='Выберите вашу страну'
          options={[
            { display: 'Узбекистан', value: 'uzbekistan' },
            { display: 'Россия', value: 'russia' },
            { display: 'США', value: 'usa' },
          ]}
          value={values.country}
          onChange={handleChange}
          name='country'
        />

        <Select
          placeholder='Выберите ваш регион'
          options={[
            { display: 'Ташкент', value: 'tashkent' },
            { display: 'Самарканд', value: 'samarkand' },
            { display: 'Андижан', value: 'andijan' },
          ]}
          value={values.region}
          onChange={handleChange}
          name='region'
        />
        <Select
          placeholder='Выберите ваш город/район'
          options={[
            { display: 'Юнусабад', value: 'yunusobod' },
            { display: 'Мирабад', value: 'mirobod' },
            { display: 'Мирзо Улугбук', value: 'mirzo_ulugbek' },
          ]}
          value={values.district}
          onChange={handleChange}
          name='district'
        /> */}

        <Select
          placeholder='Выберите семейное положение'
          options={statusOptions}
          value={values.status}
          onChange={(e) => setValues({ ...values, status: e.target.value })}
          name='status'
        />
        <Select
          placeholder='Сколько у Вас детей до 18 лет?'
          options={numberOfChildrenOptions}
          value={values.number_of_children}
          onChange={(e) =>
            setValues({ ...values, number_of_children: e.target.value })
          }
          name='number_of_children'
        />
        <Input
          placeholder='Введите место работы'
          label='Место работы'
          value={values.workplace}
          onChange={(e) => setValues({ ...values, workplace: e.target.value })}
          name='workplace'
        />
        <Input
          placeholder='Введите должность'
          label='Должность'
          value={values.position}
          onChange={(e) => setValues({ ...values, position: e.target.value })}
          name='position'
        />
        <Button text='Продолжить' />
      </form>
    </div>
  )
}

export default BonusForm
