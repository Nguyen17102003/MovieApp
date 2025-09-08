import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import { useData } from '../../context/Context'
import { gradientProps } from '../../interface/interfaces'

const Gradient:React.FC<gradientProps> = ({location}) => {
  const { type } = useParams<{ type: string }>()
  const [keyword, setKeyword] = useState<string>('')
  const { handleSearch } = useData()
  return (
    <div className='h-fit pb-20 bg-gradient-to-t from-black via-gray-800 to-[rgb(132, 245, 143)] flex flex-col'>
        <div className="w-full flex items-center justify-center pt-30 pb-15">
            <h1 className='xl:text-5xl text-white font-bold'>{location}</h1>
        </div>
        
        <div className='w-full px-10 py-2'>
            <div className='h-12 w-fit flex items-center rounded-full bg-black text-white xl:text-xl'>
                <input type="text" 
                placeholder='Enter keyword' 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className='pr-30 pl-5 outline-none h-full flex-6/10 font-medium placeholder-gray-500 leading-3'/>
                <button 
                className='h-full text-center flex items-center rounded-full flex-4/10 px-10 bg-red-600  font-semibold custom-shadow'
                onClick={() => handleSearch(keyword, type)}
                >Search</button>
            </div>
        </div>
    </div>
  )
}

export default Gradient