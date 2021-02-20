import { useEffect } from 'react'
import cls from './form.module.scss'
import { Router } from '../../i18n'
import { ThickTickIcon } from '../svg'
function BonusSuccess() {
  useEffect(() => {
    const timer = setTimeout(() => Router.push('/'), 3000)
    return () => clearTimeout(timer)
  }, [])
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

export default BonusSuccess
