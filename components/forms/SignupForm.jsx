import { useState, useEffect } from 'react'
import Button from './Button'
import cls from './form.module.scss'
import Input from './Input'
import { Router } from '../../i18n'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import axios from 'axios'
import DeviceDetector from 'device-detector-js'
function SignupForm() {
  const { phoneNum, secretKey } = parseCookies()
  const [device, setDevice] = useState(null)
  const [values, setValues] = useState({
    name: '',
    phone_signup: phoneNum || '',
    otp_signup: '',
  })
  const [nameError, setNameError] = useState(false)
  const [otpError, setOtpError] = useState(false)
  const createCookies = (func, value) =>
    new Promise((resolve, reject) => {
      func()
      resolve(value)
      reject()
    })

  const handleSubmit = (e, more) => {
    e.preventDefault()
    setNameError(false)
    setOtpError(false)
    if (!values.name) {
      setNameError(true)
    } else if (!values.otp_signup) {
      setOtpError(true)
    } else {
      axios
        .post(
          process.env.REGISTER_API_URL,
          {
            phone: values.phone_signup.replaceAll(' ', ''),
            code: values.otp_signup.replaceAll(' ', ''),
            device,
            name: values.name,
            secret: secretKey,
          },
          {
            headers: {
              'client-id': process.env.UUID,
            },
          }
        )
        .then(({ data, status }) => {
          console.log(data)
          if (status === 200) {
            createCookies(() => {
              setCookie({}, 'userId', data.token.user_id, { path: '/' })
              destroyCookie({}, 'phoneNum', { path: '/' })
              destroyCookie({}, 'secretKey', { path: '/' })
            }).then(() => Router.push(more ? '/bonus' : '/'))
          }
        })
        .catch((err) => setOtpError(true))
    }
  }
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    if (!device) {
      const deviceDetector = new DeviceDetector()
      const deviceData = deviceDetector.parse(navigator.userAgent)
      const formattedData =
        deviceData.device.brand === ''
          ? `${deviceData.os.name} ${deviceData.os.platform} | ${deviceData.client.name} ${deviceData.client.version}`
          : `${deviceData.device.brand} ${deviceData.device.model} | ${deviceData.client.name} ${deviceData.client.version}`
      setDevice(formattedData)
    }
  }, [device])
  return (
    <div className={cls.form_container}>
      <p className='heading1'>Регистрация</p>
      <form className={cls.form} onSubmit={handleSubmit}>
        <Input
          placeholder='Введите имя'
          label='Имя'
          value={values.name}
          onChange={handleChange}
          name='name'
          error={nameError}
          type='text'
        />
        <Input
          placeholder='Введите номер телефона'
          label='Номер телефона'
          value={values.phone_signup}
          onChange={handleChange}
          name='phone_signup'
          type='tel'
          phone
          disabled={phoneNum}
        />
        <Input
          placeholder='Введите одноразовый пароль'
          label='Одноразовый пароль'
          value={values.otp_signup}
          onChange={handleChange}
          name='otp_signup'
          type='tel'
          otp
          error={otpError}
        />
        {/* <Input placeholder='Введите фамилия' label='Фамилия' /> */}
        <p className={cls.extra}>
          Вы сможете заполнить дополнительные данные и получить бонус
        </p>
        <div className={cls.actions}>
          <Button text='Пропустит' variant='secondary' />
          <Button
            type='button'
            text='Продолжить'
            onClick={(e) => handleSubmit(e, true)}
          />
        </div>
      </form>
    </div>
  )
}

export default SignupForm
