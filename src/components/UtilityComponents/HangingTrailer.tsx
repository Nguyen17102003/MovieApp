import { hangingTrailerProps } from "../../interface/interfaces"
import { useData } from "../../context/Context"
const HangingTrailer:React.FC<hangingTrailerProps> = ({isOpen}) => {
  const {fetchHangingTrailer, setIsOpenTrailer} = useData()
  const {isLoading, data} = fetchHangingTrailer;
  if (!isOpen) return 
  return (
    <div className={`${isOpen ? '' : 'hidden'} fixed top-0 left-0 w-full h-full z-100 bg-[rgba(255, 255, 255, 0.5)] backdrop-brightness-55 flex justify-center items-center`}>
      <div className='w-[60vw] h-[78vh] relative'>
        <div className='w-full h-full bg-black px-5 py-5'>
        {isLoading ? (<div className="w-full h-full bg-gray-300 animate-pulse"/>) : (<iframe 
        loading='lazy'
        src={`https://www.youtube.com/embed/${data?.results[0].key}?rel=0`}
        title={data?.results[0].name}
        className='w-full h-full'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen/>)}
    
        </div>
        <span
        onClick={() => setIsOpenTrailer(false)} 
        className="absolute top-0 right-3 text-white text-2xl hover:text-red-500 cursor-pointer">x</span>
      </div>
    </div>
  )
}

export default HangingTrailer