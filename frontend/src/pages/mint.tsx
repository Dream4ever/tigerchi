import { useEffect, useState } from 'react'

import MintAvatarLeft from '@/assets/images/mint-avatar-left.png'
import MintAvatarRight from '@/assets/images/mint-avatar-right.png'
import ILink from '@/assets/icons/link.png'
import MintBg from '@/assets/images/mint-bg.png'

export default function MintPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [mintCount, setMintCount] = useState<number>(1)

  useEffect(() => {
  }, [])

  const login = () => {
    setIsLoggedIn(!isLoggedIn)
  }

  return (
    <div className='pt-20 w-full flex flex-col relative'>
      {isLoggedIn && (
        <img className='w-full absolute top-20 left-0 right-0 -z-10' src={MintBg} alt="" />
      )}
      <div className="content mt-24 w-[1200px] mx-auto">
        <div className='font-[500] text-[32px] text-yellow'>Football TigerChi</div>
        <div className="line mt-7 w-full h-px bg-yellow"></div>
        <div className='mt-20 text-center font-[500] text-[24px] text-yellow'>Mint is LIVE now!</div>
        <div className='mt-6 flex justify-between items-center'>
          <img className='mint-avatar-left w-[250px]' src={MintAvatarLeft} alt="" />
          <div className='mint-main-window w-[580px] h-[430px] bg-[#1f1f1f] rounded-2xl p-8 flex flex-col items-center'>
            <div className='bg-yellow rounded-2xl w-full h-[212px] px-12 flex justify-between items-center'>
              <div className="left w-40 flex flex-col items-center">
                <span className='font-[500] text-[56px]'>235</span>
                <span className='font-[500] text-[16px] opacity-50'>Total: 500</span>
              </div>
              <div className="center w-px h-[132px] bg-[#191919] opacity-30"></div>
              <div className="right w-40 flex flex-col">
                <div className="flex items-center">
                  <span className='font-[600] text-[13px] underline'>合约地址</span>
                  <img className='ml-2 w-1.5' src={ILink} alt="link" />
                </div>
                <span className='mt-5 text-[14px]'>1 Football TigerChi costs</span>
                <span className='mt-2 text-[14px]'>0.01ETH</span>
                <span className='mt-2 text-[14px]'>Excluding gas fee</span>
              </div>
            </div>
            {isLoggedIn
              ? (
                <div className='mt-6 mb-1 w-60'>
                  <div className="w-full py-3 flex justify-between items-center">
                    <span className='w-6 h-6 rounded bg-yellow flex justify-center items-center text-[26px]'>-</span>
                    <span className='font-[500] text-[18px] text-white'>{mintCount}</span>
                    <span className='w-6 h-6 rounded bg-yellow flex justify-center items-center text-[26px]'>+</span>
                  </div>
                </div>
              )
              : (
                <div className='mt-6 text-[12px] text-white opacity-40'>Connect to the Ethereum network</div>
              )}
            <div
              className="connect-btn mt-3 w-60 h-11 bg-yellow rounded-lg flex justify-center items-center font-[500] text-[16px] cursor-pointer select-none"
              onClick={login}
            >{isLoggedIn ? 'Mint' : 'Connect'}</div>
            <div className="notice mt-8 px-12 text-[12px] text-white opacity-40">Please make sure you connect to the right Network Etheruem with the right wallet, Algorand Mint is not on this page. Please check Algorand page</div>
          </div>
          <img className='mint-avatar-right w-[250px]' src={MintAvatarRight} alt="" />
        </div>
      </div>
      <div className="bottom mt-40 bg-yellow bg-banner bg-repeat-x bg-70% bg-center h-[60px] flex items-center">
      </div>
    </div>
  )
}
