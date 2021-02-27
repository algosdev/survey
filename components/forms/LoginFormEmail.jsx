import { useState, useEffect, useRef } from 'react'
import Button from './Button'
import cls from './form.module.scss'
import Input from './Input'
import { useRouter } from 'next/router'
import { Router, Link } from '../../i18n'
import DeviceDetector from 'device-detector-js'
import axios from 'axios'
import InputEmail from './InputEmail'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import ReCAPTCHA from 'react-google-recaptcha'
function LoginFormEmail() {
  const [values, setValues] = useState({
    email_login: '',
    otp_login: '',
    recaptcha: '',
    password_login: '',
  })
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [userExists, setUserExists] = useState(false)
  const [registering, setRegistering] = useState(false)
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
        process.env.GENERATE_OTP_EMAIL_API_URL,
        {
          email: values.email_login.replaceAll(' ', ''),
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
          }, !data?.user_found).then((res) => {
            if (res) {
              setRegistering(true)
            }
          })
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
    const data = registering
      ? {
          code: values.otp_login.replaceAll(' ', ''),
          device,
          email: values.email_login,
          secret: secretKey,
        }
      : {
          login: values.email_login,
          password: values.password_login,
        }
    axios
      .post(
        registering
          ? process.env.REGISTER_EMAIL_API_URL
          : process.env.LOGIN_EMAIL_API_URL,
        data,
        {
          headers: {
            'client-id': process.env.UUID,
          },
        }
      )
      .then(({ data, status }) => {
        setIsLoading(false)
        console.log(data)
        if (status === 200) {
          setCookie({}, 'userId', data.token.user_id, { path: '/' })
          setCookie({}, 'userToken', data.token.access_token, { path: '/' })
          destroyCookie({}, 'secretKey', data.secret, { path: '/' })
        }
      })
      .then(() => Router.push(registering ? '/signup?email=true' : '/'))
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
        setError(true)
      })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setRecaptchaError(false)
    if (userExists || registering) {
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
          placeholder='Введите адрес эл. почты'
          label='Эл. почта'
          value={values.email}
          onChange={handleChange}
          name='email_login'
          type='email'
          error={phoneNumError}
          disabled={userExists}
        />
        {registering ? (
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
        {userExists ? (
          <>
            <Input
              placeholder='Введите пароль'
              label='Пароль'
              value={values.password_login}
              onChange={handleChange}
              name='password_login'
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
        <div className={cls.extra_link}>
          {!router.query.email ? (
            <Link href='/login?email=true'>
              <a>Войти с помощью электронной почты</a>
            </Link>
          ) : (
            <Link href='/login'>
              <a>Войти с помощью номер телефона</a>
            </Link>
          )}
        </div>
      </form>
    </div>
  )
}

export default LoginFormEmail
