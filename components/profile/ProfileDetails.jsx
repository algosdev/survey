import React from 'react'
import cls from './profile.module.scss'
import { PencilIcon, UserIcon } from '../svg'
import Button from '../forms/Button'
import { destroyCookie } from 'nookies'
import { Router } from '../../i18n'
function ProfileDetails({ user }) {
  const logout = () =>
    new Promise((resolve, reject) => {
      destroyCookie({}, 'userId', {
        path: '/',
      })
      destroyCookie({}, 'secretKey', {
        path: '/',
      })
      destroyCookie({}, 'phoneNum', {
        path: '/',
      })
      resolve()
      reject()
    })

  return (
    <div className={cls.profile_container}>
      <p className='heading1'>Профиль</p>
      <div className={cls.main_details}>
        <div className={cls.avatar}>
          {user?.image?.url ? (
            <img src={user?.image?.url} alt='Avatar' />
          ) : (
            <UserIcon />
          )}
        </div>
        <p className='heading2'>{user?.name}</p>
        <p className={cls.balance}>Баланс: 0 сум</p>
      </div>
      <div className={cls.extra_details}>
        <div className={cls.header}>
          <p className='heading3'>Полные данные</p>
          <button>
            <PencilIcon />
          </button>
        </div>
        <div className={cls.content}>
          <div className={cls.row}>
            <div className={cls.type}>Номер телефона</div>
            <div className={cls.value}>{user?.phone}</div>
          </div>
          {/* <div className={cls.row}>
            <div className={cls.type}>Дата рождения</div>
            <div className={cls.value}>15.07.2000</div>
          </div>
          <div className={cls.row}>
            <div className={cls.type}>Национальност</div>
            <div className={cls.value}>Узбек</div>
          </div>
          <div className={cls.row}>
            <div className={cls.type}>Количество детей</div>
            <div className={cls.value}>1</div>
          </div>
          <div className={cls.row}>
            <div className={cls.type}>Рабочая места</div>
            <div className={cls.value}>UDEVS</div>
          </div> */}
          <div className={cls.logout}>
            <Button
              variant='secondary'
              text='Выйти'
              small
              onClick={() => logout().then(() => Router.push('/login'))}
            />
            {/* <button>Выйти</button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetails
