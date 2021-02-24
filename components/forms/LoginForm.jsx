import { useState, useEffect, useRef } from 'react'
import Button from './Button'
import cls from './form.module.scss'
import Input from './Input'
import { Router } from '../../i18n'
import DeviceDetector from 'device-detector-js'
import axios from 'axios'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import ReCAPTCHA from 'react-google-recaptcha'
function LoginForm() {
  const [values, setValues] = useState({
    phone_login: '',
    otp_login: '',
    recaptcha: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [userExists, setUserExists] = useState(false)
  const [recaptchaError, setRecaptchaError] = useState(false)
  const [error, setError] = useState(false)
  const [phoneNumError, setPhoneNumError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [device, setDevice] = useState(null)
  const recaptcha = useRef()
  const { secretKey } = parseCookies()
  const createCookies = (func, value) =>
    new Promise((resolve, reject) => {
      func()
      resolve(value)
      reject()
    })
  const sendOTP = () => {
    setIsLoading(true)
    setPhoneNumError(false)
    axios
      .post(
        process.env.GENERATE_OTP_API_URL,
        {
          phone: values.phone_login.replaceAll(' ', ''),
        },
        {
          headers: {
            'client-id': process.env.UUID,
          },
        }
      )
      .then(({ data, status }) => {
        setIsLoading(false)
        if (status === 200) {
          if (data?.user_found) {
            setUserExists(true)
          }
          createCookies(() => {
            setCookie({}, 'secretKey', data.secret, { path: '/' })
            setCookie({}, 'phoneNum', values.phone_login, { path: '/' })
          }, !data?.user_found).then((res) => res && Router.push('/signup'))
        }
      })
      .catch((err) => {
        setIsLoading(false)
        setPhoneNumError(true)
      })
  }

  const checkOTP = () => {
    setError(false)
    setIsLoading(true)
    axios
      .post(
        process.env.LOGIN_API_URL,
        {
          code: values.otp_login.replaceAll(' ', ''),
          device,
          phone: values.phone_login.replaceAll(' ', ''),
          secret: secretKey,
        },
        {
          headers: {
            'client-id': process.env.UUID,
          },
        }
      )
      .then(({ data, status }) => {
        setIsLoading(false)
        if (status === 200) {
          setCookie({}, 'userId', data.token.user_id, { path: '/' })
          destroyCookie({}, 'secretKey', data.secret, { path: '/' })
          destroyCookie({}, 'phoneNum', values.phone_login, { path: '/' })
        }
      })
      .then(() => Router.push('/'))
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
        setError(true)
      })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setRecaptchaError(false)
    if (userExists) {
      if (values.recaptcha === '' || !values.recaptcha.trim()) {
        setRecaptchaError(true)
      } else {
        checkOTP()
      }
    } else {
      sendOTP()
    }
  }
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    if (recaptcha.current) {
      console.log(recaptcha.current)
      // .setAttribute('required', 'required')
    }
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
      <p className='heading1'>Войти</p>
      <form className={cls.form} onSubmit={handleSubmit} autoComplete='off'>
        <Input
          placeholder='Введите номер телефона'
          label='Номер телефона'
          value={values.phone_login}
          onChange={handleChange}
          name='phone_login'
          type='tel'
          error={phoneNumError}
          phone
          disabled={userExists}
        />
        {userExists ? (
          <>
            <Input
              placeholder='Введите одноразовый пароль'
              label='Одноразовый пароль'
              value={values.otp_login}
              onChange={handleChange}
              name='otp_login'
              type='tel'
              otp
              error={error}
            />
            <div className={cls.recaptcha_survey}>
              <ReCAPTCHA
                sitekey='6Lfly2UaAAAAAOovZnMTe7Ginwy5KBrZcyBc9GZW
    '
                hl='ru'
                ref={recaptcha}
                onChange={(val) => setValues({ ...values, recaptcha: val })}
              />
              {recaptchaError ? (
                <p className={cls.error}>Требуется проверка человеком</p>
              ) : (
                ''
              )}
            </div>
          </>
        ) : (
          ''
        )}

        <div className={cls.actions}>
          <Button text='Продолжить' isLoading={isLoading} success={success} />
        </div>
      </form>
    </div>
  )
}

export default LoginForm
