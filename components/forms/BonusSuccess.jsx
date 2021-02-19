import React from 'react'
import cls from './form.module.scss'
import { ThickTickIcon } from '../svg'
function LoginForm() {
  return (
    <div className={cls.form_container}>
      <div className={cls.success}>
        <div className={cls.tick}>
          <ThickTickIcon />
        </div>
        <div className={cls.details}>
          Поздравляем вы получили{' '}
          <span className={cls.highlight}>5.000 сум</span> за заполнение
          дополнительные данные
        </div>
      </div>
    </div>
  )
}

export default LoginForm
