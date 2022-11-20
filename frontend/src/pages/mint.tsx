import { useEffect, useState } from 'react'
import { useAccount, useConnect, useNetwork } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import MintAvatarLeft from '@/assets/images/mint-avatar-left.png'
import MintAvatarRight from '@/assets/images/mint-avatar-right.png'
import MintBg from '@/assets/images/mint-bg.png'

export default function MintPage() {
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  const [showDialog, setShowDialog] = useState<boolean>(false)

  useEffect(() => {
  }, [])

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  const doSth = () => {
    if (!isConnected) {
      connect()
    } else if (chain?.id !== 1) {
      setShowDialog(true)
    }
  }

  const closeDialog = () => {
    setShowDialog(false)
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
        <div className='mint-dialog mt-6 flex justify-between items-center'>
          <img className='mint-avatar-left w-[250px]' src={MintAvatarLeft} alt="" />
          <div className={`mint-main-window w-[580px] bg-[#1f1f1f] rounded-2xl p-8 flex flex-col items-center ${isConnected ? 'border-2 border-yellow' : ''}`}>
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
              onClick={doSth}
            >{isConnected ? 'Mint' : 'Connect'}</div>
            <div className="notice mt-8 px-12 text-[12px] text-white opacity-40">Please make sure you connect to the right Network Etheruem with the right wallet, Algorand Mint is not on this page. Please check Algorand page</div>
          </div>
          <img className='mint-avatar-right w-[250px]' src={MintAvatarRight} alt="" />
        </div>
      </div>
      {showDialog && (
        <div className='mask fixed z-[100] top-0 bottom-0 left-0 right-0 bg-gray-900/80 flex justify-center items-center'
          onClick={closeDialog}
        >
          <div className="dialog rounded-xl bg-yellow flex flex-col justify-center items-center px-4 py-8">
            <div className="w-full px-2 flex justify-end">
              <svg className="icon w-6 h-6 cursor-pointer" onClick={closeDialog} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2668" width="32" height="32">
                <path d="M571.733333 512l268.8-268.8c17.066667-17.066667 17.066667-42.666667 0-59.733333-17.066667-17.066667-42.666667-17.066667-59.733333 0L512 452.266667 243.2 183.466667c-17.066667-17.066667-42.666667-17.066667-59.733333 0-17.066667 17.066667-17.066667 42.666667 0 59.733333L452.266667 512 183.466667 780.8c-17.066667 17.066667-17.066667 42.666667 0 59.733333 8.533333 8.533333 19.2 12.8 29.866666 12.8s21.333333-4.266667 29.866667-12.8L512 571.733333l268.8 268.8c8.533333 8.533333 19.2 12.8 29.866667 12.8s21.333333-4.266667 29.866666-12.8c17.066667-17.066667 17.066667-42.666667 0-59.733333L571.733333 512z" p-id="2669"></path>
              </svg>
            </div>
            <div className="title mt-2 text-5xl">Caution</div>
            <div className="content mt-12 w-[440px] text-lg text-center">It's unable to mint since you're not in ETH mainnet.<br />Please switch to ETH mainnet first.</div>
          </div>
        </div>
      )}
    </div>
  )
}
