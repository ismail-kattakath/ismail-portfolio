import { MdPictureAsPdf } from 'react-icons/md'

const WinPrint = () => {
  const print = () => {
    window.print()
  }

  return (
    <button
      aria-label="Download Resume"
      className="exclude-print fixed right-10 bottom-5 cursor-pointer rounded-full border-2 border-white bg-white font-bold text-red-800 shadow-lg"
      onClick={print}
    >
      <MdPictureAsPdf className="h-10 w-10" title="Download Resume" />
    </button>
  )
}

export default WinPrint
