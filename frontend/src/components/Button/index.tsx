import YellowBg from '@/assets/images/btn-bg-yellow.png'
import GrayBg from '@/assets/images/btn-bg-gray.png'
import Dropdown from '@/assets/icons/dropdown.png'

export default function NavBar({
  text,
  btnBg = 'yellow',
  withDropdown = false,
  click,
}: {
  text: string
  btnBg?: 'yellow' | 'gray'
  withDropdown?: Boolean
  click?: Function
}) {
  const handle = () => {
    click?.()
  }

  return (
    <div
      className='relative flex justify-center items-center w-[178px] h-[48px] cursor-pointer'
      onClick={handle}
    >
      <img
        className='absolute w-full h-full'
        src={btnBg === 'yellow' ? YellowBg : GrayBg}
        alt="btn-bg"
      />
      <div className='z-10 flex items-center'>
        <span className='font-[500]'>{text}</span>
        {withDropdown && (
          <img className='ml-1.5 w-2' src={Dropdown} alt="" />
        )}
      </div>
    </div>
  )
}
