import React, { useState, useEffect } from 'react'
import { Link } from '../../i18n'
import cls from './header.module.scss'
import { HamburgerIcon, CloseIcon } from '../svg'
function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    if (menuOpen && window) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [menuOpen])
  return (
    <div className={cls.header_container}>
      <div className={cls.hamburger} onClick={() => setMenuOpen(true)}>
        <HamburgerIcon />
      </div>
      <div className={cls.title}>
        <p className='heading1'>Главная</p>
      </div>
      <div className={`${menuOpen ? cls.open : ''} ${cls.menu}`}>
        <div className={cls.menu_header}>
          <div
            className={`${cls.close} ${menuOpen ? cls.visible : cls.hidden}`}
            onClick={() => setMenuOpen(false)}
          >
            <CloseIcon />
          </div>
        </div>
        <div className={cls.menu_content}>
          <ul
            className={`${cls.list} ${menuOpen ? cls.visible : cls.hidden}`}
            onClick={() => setMenuOpen(false)}
          >
            <li>
              <Link href='/'>
                <a>Главная</a>
              </Link>
            </li>
            <li>
              <Link href='/profile'>
                <a>Профиль</a>
              </Link>
            </li>
            <li>
              <Link href='/link-card'>
                <a>Прикрепить карту</a>
              </Link>
            </li>
            <li>
              <Link href='/bonus'>
                <a>Получить бонус</a>
              </Link>
            </li>
            <li>
              <Link href='/login'>
                <a>Логин</a>
              </Link>
            </li>
            <li>
              <Link href='/signup'>
                <a>Регистрация</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
