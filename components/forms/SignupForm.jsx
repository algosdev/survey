import { useState, useEffect } from 'react'
import Button from './Button'
import cls from './form.module.scss'
import Input from './Input'
import { Router } from '../../i18n'
import { useRouter } from 'next/router'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import axios from 'axios'
import Select from './Select'
import moment from 'moment'
import DeviceDetector from 'device-detector-js'
function SignupForm() {
  const router = useRouter()
  const { phoneNum, secretKey } = parseCookies()
  const [device, setDevice] = useState(null)
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    phone_signup: phoneNum || '',
    otp_signup: '',
    country: 'none',
    region: 'none',
    district: 'none',
    date_of_birth: '',
    gender: 'none',
  })
  const [nameError, setNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [otpError, setOtpError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const createCookies = (func, value) =>
    new Promise((resolve, reject) => {
      func()
      resolve(value)
      reject()
    })
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }
  const handleSubmit = (e, more) => {
    e.preventDefault()
    setNameError(false)
    setLastNameError(false)
    setOtpError(false)
    setEmailError(false)
    if (!values.first_name) {
      setNameError(true)
    } else if (!values.last_name) {
      setLastNameError(true)
    }
    //  else if (!validateEmail(values.email)) {
    //   setEmailError(true)
    // }
    // else if (!values.otp_signup) {
    //   setOtpError(true)
    // }
    else {
      console.log('reached')
      axios
        .post(
          process.env.UPDATE_CUSTOMER_API_URL,
          {
            // phone: values.phone_signup.replaceAll(' ', ''),
            // code: values.otp_signup.replaceAll(' ', ''),
            // device,
            firstname: values.first_name,
            lastname: values.last_name,
            country: values.country,
            region: values.region,
            dob: moment(values.date_of_birth).format('YYYY-MM-DD'),
            district: values.district,
            gender: values.gender,
            // email: values.email,
            // secret: secretKey,
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
  const arr = [1, 2, 3, 4, 5, 6]
  const newArr = arr.filter((el, index) => index % 2 === 1)
  console.log(`${arr}\n${newArr}`)
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
          value={values.first_name}
          onChange={handleChange}
          name='first_name'
          error={nameError}
          type='text'
        />
        <Input
          placeholder='Введите фамилия'
          label='Фамилия'
          value={values.last_name}
          onChange={handleChange}
          name='last_name'
          error={lastNameError}
          type='text'
        />
        <Input
          label='Выберите дата рождения'
          type='date'
          value={values.date_of_birth}
          onChange={handleChange}
          name='date_of_birth'
        />
        <Select
          placeholder='Пол'
          options={[
            { display: 'Мужчина', value: 'male' },
            { display: 'Женщина', value: 'female' },
          ]}
          value={values.gender}
          onChange={handleChange}
          name='gender'
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
        />
        {/* <Input
          placeholder='Введите электронная почта'
          label='Электронная почта'
          value={values.email}
          onChange={handleChange}
          name='email'
          error={emailError}
          type='text'
        /> */}
        {/* <Input
          placeholder='Введите номер телефона'
          label='Номер телефона'
          value={values.phone_signup}
          onChange={handleChange}
          name='phone_signup'
          type='tel'
          phone
          disabled={phoneNum}
        /> */}
        {/* <Input
          placeholder='Введите одноразовый пароль'
          label='Одноразовый пароль'
          value={values.otp_signup}
          onChange={handleChange}
          name='otp_signup'
          type='tel'
          otp
          error={otpError}
        /> */}
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
