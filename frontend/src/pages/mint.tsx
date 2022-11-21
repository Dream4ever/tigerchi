import { useEffect, useState } from 'react'
import {
  useAccount,
  useConnect,
  useNetwork,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { BigNumberish, ethers } from 'ethers'

import axios from 'axios'
import keccak256 from 'keccak256'
import { MerkleTree } from 'merkletreejs'

import { tigerChiAddr, tigerChiABI } from '@/static/contract'

import MintAvatarLeft from '@/assets/images/animation1.gif'
import MintAvatarRight from '@/assets/images/animation2.gif'
import MintBg from '@/assets/images/mint-bg.png'

export default function MintPage() {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()

  const [publicPrice, setPublicPrice] = useState<string>('')
  const [whitePrice, setWhitePrice] = useState<string>('')
  const [mintNumber, setMintNumber] = useState<number>(0)

  const [whiteList, setWhiteList] = useState<string[]>([])
  const [proof, setProof] = useState<string[]>([
    "0xa6e11421e6dcd9abb7a00504ae437cc45483829b6fe6d2b791432ea96759dfad",
    "0x8cbb375fc64b9b80d7c5940fbfdb7b96fca9eab7f178f627bb69eab43445302f",
  ])

  const [showDialog, setShowDialog] = useState<boolean>(false)

  // 1. 读取 NFT 价格及 Mint 数量
  // 1.1
  const { data: public_Price } = useContractRead({
    address: tigerChiAddr,
    abi: tigerChiABI,
    functionName: 'PUBLIC_PRICE',
  })
  if (public_Price && !publicPrice) {
    setPublicPrice(ethers.utils.formatUnits(public_Price as BigNumberish))
  }
  // 1.2
  const { data: white_Price } = useContractRead({
    address: tigerChiAddr,
    abi: tigerChiABI,
    functionName: 'WHITE_PRICE',
  })
  if (white_Price && !whitePrice) {
    setWhitePrice(ethers.utils.formatUnits(white_Price as BigNumberish))
  }
  // 1.3
  const { data: mint_Number } = useContractRead({
    address: tigerChiAddr,
    abi: tigerChiABI,
    functionName: 'getMintNumber',
  })
  if (mint_Number && !mintNumber) {
    setMintNumber(Number(mint_Number))
  }

  useEffect(() => {
    // mintnumber 需及更新
    getWhiteList()
  }, [])

  useEffect(() => {
    if (whiteList.length) {
      makeProof(whiteList)
    }
  }, [whiteList])

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  // 2.1 公开 Mint
  const { config: publicMintConfig } = usePrepareContractWrite({
    address: tigerChiAddr,
    abi: tigerChiABI,
    functionName: 'publicMint',
    // args: [
    //   address,
    //   proof,
    // ],
    overrides: {
      value: ethers.utils.parseEther('0.015'),
    },
  })
  const { data: publicData, write: publicWrite } = useContractWrite(publicMintConfig)

  // 2.3 白名单 Mint
  const { config: whiteListMintconfig } = usePrepareContractWrite({
    address: tigerChiAddr,
    abi: tigerChiABI,
    functionName: 'whiteListMint',
    args: [
      address,
      proof,
    ],
    overrides: {
      value: ethers.utils.parseEther('0.01'),
    },
  })
  const { data: whiteListData, write: whiteListWrite } = useContractWrite(whiteListMintconfig)

  const makeProof = (whiteList: string[]) => {
    const leafNodes = whiteList.map((item) => keccak256(item))
    const tree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })

    const isInWhiteList = whiteList.findIndex(item => {
      return address === item
    })

    if (isInWhiteList !== -1 && address) {
      //生成地址对应的哈希证明
      let leaf = keccak256(address)
      setProof(tree.getHexProof(leaf))
    }
  }

  const getWhiteList = async () => {
    const result = await axios.get('https://gist.githubusercontent.com/Dream4ever/b638d7ee2a176e75c3b07c05767c5cc8/raw/7c1e1402649aef5f4a50624a8fc0ae3c6b0aac88/tigerchi_whitelist.json')
    if (result.data && result.data.whitelistAddresses) {
      setWhiteList(result.data.whitelistAddresses)
    }
  }

  const doPublicMint = () => { }

  const doSafeMint = () => {
    if (!isConnected) {
      connect()
      return
    }

    publicWrite?.()
  }

  const doWhiteListMint = () => {
    if (!isConnected) {
      connect()
      return
    }

    if (whiteList.length) {
      whiteListWrite?.()
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
                <span className='font-[500] text-[56px]'>{mintNumber}</span>
                <span className='font-[500] text-[16px] opacity-50'>Total: 500</span>
              </div>
              <div className="center w-px h-[132px] bg-[#191919] opacity-30"></div>
              <div className="right w-40 flex flex-col">
                <span className='mt-5 text-[14px]'>1 Football TigerChi costs</span>
                <span className='mt-2 text-[14px]'>Public Price: {publicPrice}ETH</span>
                <span className='mt-2 text-[14px]'>Whitelist Price: {whitePrice}ETH</span>
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
              onClick={doPublicMint}
            >{isConnected ? 'publicMint' : 'Connect'}</div>
            <div
              className="connect-btn mt-4 w-60 h-11 bg-yellow rounded-lg flex justify-center items-center font-[500] text-[16px] cursor-pointer select-none"
              onClick={doSafeMint}
            >{isConnected ? 'safeMint' : 'Connect'}</div>
            <div
              className="connect-btn mt-4 w-60 h-11 bg-yellow rounded-lg flex justify-center items-center font-[500] text-[16px] cursor-pointer select-none"
              onClick={doWhiteListMint}
            >{isConnected ? 'whiteListMint' : 'Connect'}</div>
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
