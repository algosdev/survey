import React from 'react'
import cls from './profile.module.scss'
import { PencilIcon, UserIcon } from '../svg'
function ProfileDetails() {
  return (
    <div className={cls.profile_container}>
      <p className='heading1'>Профиль</p>
      <div className={cls.main_details}>
        <div className={cls.avatar}>
          <UserIcon />
        </div>
        <p className='heading2'>Фазлиддин Хидоятов</p>
        <p className={cls.balance}>Баланс: 239 450 сум</p>
      </div>
      <div className={cls.extra_details}>
        <div className={cls.header}>
          <p className='heading3'>Полные данные</p>
          <PencilIcon />
        </div>
        <div className={cls.content}>
          <div className={cls.row}>
            <div className={cls.type}>Пол</div>
            <div className={cls.value}>Мужской</div>
          </div>
          <div className={cls.row}>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetails
