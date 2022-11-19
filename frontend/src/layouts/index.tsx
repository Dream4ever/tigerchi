import { useState } from 'react'
import { Link, Outlet } from 'umi'

import Logo from '@/assets/images/logo-horizontal.png'
import Logo2 from '@/assets/images/logo.png'
import Coin from '@/assets/images/coin.png'
import Connect from '@/assets/images/btn-bg-yellow.png'
import Dropdown from '@/assets/icons/dropdown.png'
import Discord from '@/assets/icons/discord.png'
import Telegram from '@/assets/icons/telegram.png'
import Twitter from '@/assets/icons/twitter.png'

export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>('')

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

  return (
    <div className='w-full min-h-screen overflow-x-hidden'>
      {/* 顶部导航栏 */}
      <div className='navs px-12 py-4 flex justify-between items-center'>
        {/* 左侧 logo 及页面链接 */}
        <div className="left flex items-center">
          <img className='' src={Logo} width="145" />
          <div className="seperator ml-8 mr-10 w-0.5 h-6 bg-white/25"></div>
          <div className="links text-white">
            <Link to="/eth">ETH</Link>
            <Link className='ml-10' to="/mint">MINT</Link>
          </div>
        </div>
        {/* 右侧钱包信息 */}
        <div className='flex items-center'>
          {!isLoggedIn && (
            <div className='flex items-center'>
              <img className='w-[30px] h-[30px]' src={Coin} />
              <div className="ml-2 flex flex-col text-white">
                <span className='text-xs'>Balance:</span>
                <span className='mt-0.5 font-[500]'>123456</span>
              </div>
            </div>
          )}
          <div className='ml-12 relative flex justify-center items-center w-[178px] h-[48px]'>
            <img className='absolute w-full h-full' src={Connect} alt="" />
            <div className='z-10 flex items-center'>
              <span className='font-[500]'>{isLoggedIn ? userName : 'Connect wallet'}</span>
              <img className='ml-1.5 w-2' src={Dropdown} alt="" />
            </div>
          </div>
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
