import { useState } from 'react'
import Button from './Button'
import cls from './form.module.scss'
import Input from './Input'
import { Router } from '../../i18n'
import { useRouter } from 'next/router'
function LoginForm() {
  const [values, setValues] = useState({ phone_login: '', otp_login: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const handleSubmit = (e) => {
    e.preventDefault()
    router.push('/')
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 5000)
  }
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  console.log(values)
  return (
    <div className={cls.form_container}>
      <p className='heading1'>Войти</p>
      <form className={cls.form} onSubmit={handleSubmit}>
        <Input
          placeholder='Введите номер телефона'
          label='Номер телефона'
          value={values.phone_login}
          onChange={handleChange}
          name='phone_login'
          type='tel'
          phone
        />
        <Input
          placeholder='Введите пароль'
          label='Пароль'
          value={values.otp_login}
          onChange={handleChange}
          name='otp_login'
          type='tel'
          otp
        />
        <div className={cls.actions}>
          <Button text='Продолжить' isLoading={isLoading} success={success} />
        </div>
      </form>
    </div>
  )
}

export default LoginForm
