import { useState } from 'react'
import { NavLink, Outlet, history } from 'umi'

import Button from '@/components/Button/index'

import Logo from '@/assets/images/logo-horizontal.png'
import Logo2 from '@/assets/images/logo.png'
import Coin from '@/assets/images/coin.png'
import Discord from '@/assets/icons/discord.png'
import Telegram from '@/assets/icons/telegram.png'
import Twitter from '@/assets/icons/twitter.png'

export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>('')
  const [isConnect, setIsConnect] = useState<boolean>(false)

  const defaultClassName = 'py-4 text-white'
  const activeClassName = 'py-4 border-b border-yellow text-yellow'

  const socials = [
    {
      url: '',
      iconPath: Discord,
    },
    {
      url: '',
      iconPath: Telegram,
    },
    {
      url: '',
      iconPath: Twitter,
    },
  ]

  const toHome = () => {
    history.push('/')
  }

  const login = () => {
    if (!userName) {
      setUserName('Samsara9527')
      setIsLoggedIn(true)
      setIsConnect(true)
    } else {
      setUserName('')
      setIsLoggedIn(false)
      setIsConnect(false)
    }
  }

  return (
    <div className='w-full min-h-screen overflow-x-hidden'>
      {/* 顶部导航栏 */}
      <div className='navs fixed w-full bg-black z-50 px-12 h-20 flex justify-between items-center'>
        {/* 左侧 logo 及页面链接 */}
        <div className="left flex items-center">
          <img className='cursor-pointer' src={Logo} onClick={toHome} width="145" />
          <div className="seperator ml-8 mr-10 w-0.5 h-6 bg-white/25"></div>
          <div className="links flex items-center gap-x-10">
            <NavLink
              to="/eth"
              className={({ isActive }) =>
                isActive ? activeClassName : defaultClassName
              }
            >ETH</NavLink>
            <NavLink
              to="/mint"
              className={({ isActive }) =>
                isActive ? activeClassName : defaultClassName
              }
            >MINT</NavLink>
          </div>
        </div>
        {/* 右侧钱包信息 */}
        <div className='flex items-center'>
          {!isLoggedIn && (
            <div className='flex items-center mr-12'>
              <img className='w-[30px] h-[30px]' src={Coin} />
              <div className="ml-2 flex flex-col text-white">
                <span className='text-xs'>Balance:</span>
                <span className='mt-0.5 font-[500]'>123456</span>
              </div>
            </div>
          )}
          <Button
            text={isLoggedIn ? userName : 'Connect wallet'}
            withDropdown={true}
            isConnect={isConnect}
            click={login}
          />
        </div>
      </div>
      <Outlet />
      {/* 底栏 */}
      <div className="footer flex flex-col items-center">
        <img className='mt-20 w-[136px]' src={Logo2} alt="" />
        <span className='mt-4 font-[600] text-[36px] text-white'>Tiger Chi</span>
        <span className='mt-2 font-[500] text-[14px] text-white'>© 2022 TigerChi</span>
        <div className='mt-[60px] flex items-center gap-x-3'>
          {socials.map((item, i) => (
            <img
              className='w-10 cursor-pointer'
              src={item.iconPath}
              key={i}
              alt='icon'
            />
          ))}
        </div>
        <div className='mt-[30px] pb-20 flex items-center text-[14px] text-white opacity-50'>
          <span>Terms & Conditions</span>
          <span className='ml-5'>Privacy Policy</span>
        </div>
      </div>
    </div>
  )
}
