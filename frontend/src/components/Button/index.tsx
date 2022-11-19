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

  const sizeStyles = {
    width: '178px',
    height: '48px',
  }

  const textStyles = {
    zIndex: 20,
    fontWeight: 500,
    color: btnBg === 'yellow' ? '#000' : '#fff',
  }

  const iconStyles = {
    zIndex: 20,
    marginLeft: '6px',
    width: '8px',
  }

  return (
    <div
      className='relative flex justify-center items-center cursor-pointer'
      style={sizeStyles}
      onClick={handle}
    >
      <img
        className='absolute top-0 left-0'
        style={sizeStyles}
        src={btnBg === 'yellow' ? YellowBg : GrayBg}
        alt="btn-bg"
      />
      <div className='flex items-center'>
        <span style={textStyles}>{text}</span>
        {withDropdown && (
          <img
            style={iconStyles}
            src={Dropdown}
            alt="dropdown"
          />
        )}
      </div>
    </div>
  )
}
