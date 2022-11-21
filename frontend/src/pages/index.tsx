import Button from '@/components/Button/index'

import HomeBg from '@/assets/images/home-bg.png'

const textBorderStyles = {
  textShadow: '-1px 0 #fff, 1px 0 #fff, 0 -1px #fff, 0 1px #fff',
}

const navTo = (target: string): void => {
  if (target === 'discord') {
    location.href = 'https://discord.gg/TigerChiClub'
  } else if (target === 'opensea') {
    location.href = 'https://opensea.io/'
  }
}

export default function HomePage() {
  return (
    <div className='pt-20 w-full flex flex-col'>
      <div className="top bg-yellow bg-banner bg-repeat-x bg-70% bg-center h-[60px] flex items-center">
      </div>
      <div className="center relative">
        <img className='w-full' src={HomeBg} alt="" />
        <div className="absolute top-0 left-[20%] w-full h-full flex flex-col justify-center">
          <div className='font-[600] text-[48px]' style={textBorderStyles}>Welcome to the</div>
          <div className='font-[500] leading-[1] text-yellow text-[96px]'>TigerChi</div>
          <div className='font-[500] leading-[1] text-white text-[96px]'>Kingdom</div>
          <div className='mt-12 font-[400] text-white text-[25px]'>Hope you have fun! 🙌</div>
          <div className='mt-12 flex items-center gap-x-3'>
            <Button
              text='View Collections'
              click={() => navTo('opensea')}
            />
            <Button
              text='Join Us'
              btnBg='gray'
              click={() => navTo('discord')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
