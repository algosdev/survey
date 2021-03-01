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
function ForgotForm() {
  const [values, setValues] = useState({
    email_login: '',
    otp_login: '',
    recaptcha: '',
    password_login_confirm: '',
    password_login: '',
  })
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [userExists, setUserExists] = useState(false)
  const [registering, setRegistering] = useState(false)
  const [recaptchaError, setRecaptchaError] = useState(false)
  const [error, setError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [accessToUpdate, setAccessToUpdate] = useState(false)
  const [device, setDevice] = useState(null)
  const recaptcha = useRef()
  const { secretKey, userToken } = parseCookies()
  const createCookies = (func, value) =>
    new Promise((resolve, reject) => {
      func()
      resolve(value)
      reject()
    })
  const sendOTP = () => {
    setIsLoading(true)
    setPasswordError(false)
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
          }, !data?.user_found)
        }
      })
      .catch((err) => {
        setIsLoading(false)
        setPasswordError(true)
      })
  }
  const updatePassword = () => {
    setPasswordError(false)
    setIsLoading(true)
    axios
      .put(
        'https://survey.api.udevs.io/v1/update-customer-password',
        {
          password: values.password_login,
        },
        {
          headers: {
            Authorization: userToken,
            'client-id': process.env.UUID,
          },
        }
      )
      .then((res) => {
        setIsLoading(false)
        if (res.status === 204) {
          setSuccess(true)
          setTimeout(() => router.push('/'), 1000)
        }
        console.log(res)
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err)
      })
  }
  const checkOTP = () => {
    setError(false)
    setIsLoading(true)
    const data = {
      code: values.otp_login.replaceAll(' ', ''),
      device,
      email: values.email_login,
      secret: secretKey,
    }

    axios
      .post(process.env.CHECK_OTP_EMAIL_API_URL, data, {
        headers: {
          'client-id': process.env.UUID,
        },
      })
      .then(({ data, status }) => {
        setIsLoading(false)
        console.log(data)
        if (status === 200) {
          setCookie({}, 'userId', data.token.user_id, { path: '/' })
          setCookie({}, 'userToken', data.token.access_token, { path: '/' })
          destroyCookie({}, 'secretKey', data.secret, { path: '/' })
        }
      })
      .then(() => setAccessToUpdate(true))
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
        setError(true)
      })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setRecaptchaError(false)
    setPasswordError(false)
    if (accessToUpdate) {
      if (values.password_login_confirm !== values.password_login) {
        setPasswordError(true)
      } else if (values.recaptcha === '' || !values.recaptcha?.trim()) {
        setRecaptchaError(true)
      } else {
        updatePassword()
      }
    } else if (userExists) {
      checkOTP()
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
      <p className='heading1'>Забыл пароль?</p>
      <form className={cls.form} onSubmit={handleSubmit} autoComplete='off'>
        <Input
          placeholder='Введите адрес эл. почты'
          label='Эл. почта'
          value={values.email}
          onChange={handleChange}
          name='email_login'
          type='email'
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
              disabled={accessToUpdate}
              error={error}
            />
          </>
        ) : (
          ''
        )}
        {accessToUpdate ? (
          <>
            <Input
              placeholder='Введите пароль'
              label='Пароль'
              value={values.password_login}
              onChange={handleChange}
              name='password_login'
              error={passwordError}
            />
            <Input
              placeholder='Повторите пароль'
              label='Повторите пароль'
              value={values.password_login_confirm}
              onChange={handleChange}
              name='password_login_confirm'
              error={passwordError}
            />
            <div className={cls.recaptcha_survey}>
              {passwordError ? (
                <p className={cls.error}>Пароли не соответствуют</p>
              ) : (
                ''
              )}
            </div>
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
          <Button
            text='Продолжить'
            isLoading={isLoading}
            success={success ? 'Успешно изменен' : ''}
          />
        </div>

        <div className={cls.extra_link}>
          <Link href='/login'>
            <a>Уже есть аккаунт?</a>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default ForgotForm
