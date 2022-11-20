import { useEffect } from 'react'
import { useAccount, useConnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import MintAvatarLeft from '@/assets/images/mint-avatar-left.png'
import MintAvatarRight from '@/assets/images/mint-avatar-right.png'
import MintBg from '@/assets/images/mint-bg.png'

export default function MintPage() {
  const { isConnected } = useAccount()

  useEffect(() => {
  }, [])

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  const doConnect = () => {
    connect()
  }

  return (
    <div className='pt-20 pb-40 w-full flex flex-col relative'>
      {isConnected && (
        <img className='w-full absolute top-20 left-0 right-0 -z-10' src={MintBg} alt="" />
      )}
      <div className="content mt-24 w-[1200px] mx-auto">
        <div className='font-[500] text-[32px] text-yellow'>Football TigerChi</div>
        <div className="line mt-7 w-full h-px bg-yellow"></div>
        <div className='mt-20 text-center font-[500] text-[24px] text-yellow'>Mint is LIVE now!</div>
        <div className='mt-6 flex justify-between items-center'>
          <img className='mint-avatar-left w-[250px]' src={MintAvatarLeft} alt="" />
          <div className='mint-main-window w-[580px] bg-[#1f1f1f] rounded-2xl p-8 flex flex-col items-center'>
            <div className='bg-yellow rounded-2xl w-full h-[212px] px-12 flex justify-between items-center'>
              <div className="left w-40 flex flex-col items-center">
                <span className='font-[500] text-[56px]'>235</span>
                <span className='font-[500] text-[16px] opacity-50'>Total: 500</span>
              </div>
              <div className="center w-px h-[132px] bg-[#191919] opacity-30"></div>
              <div className="right w-40 flex flex-col">
                <span className='mt-5 text-[14px]'>1 Football TigerChi costs</span>
                <span className='mt-2 text-[14px]'>0.01ETH</span>
                <span className='mt-2 text-[14px]'>Excluding gas fee</span>
              </div>
            </div>
            {isConnected
              ? (
                <></>
              )
              : (
                <div className='mt-6 text-[12px] text-white opacity-40'>Connect to the Ethereum network</div>
              )}
            <div
              className="connect-btn mt-4 w-60 h-11 bg-yellow rounded-lg flex justify-center items-center font-[500] text-[16px] cursor-pointer select-none"
              onClick={doConnect}
            >{isConnected ? 'Mint' : 'Connect'}</div>
            <div className="notice mt-8 px-12 text-[12px] text-white opacity-40">Please make sure you connect to the right Network Etheruem with the right wallet, Algorand Mint is not on this page. Please check Algorand page</div>
          </div>
          <img className='mint-avatar-right w-[250px]' src={MintAvatarRight} alt="" />
        </div>
      </div>
    </div>
  )
}
