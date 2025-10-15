import React from 'react'
import { roomsDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'

const FeaturedDestination = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();

  return (
    <div className={`flex flex-col items-center px-6 md:px-16 lg:px-24 py-20 ${theme === 'dark' ? 'bg-surface text-[var(--text)]' : 'bg-slate-50'}`}>
        <Title title="Featured Destination" subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalled luxury and unforgettable experiences."/>
        <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
            {roomsDummyData.slice(0,4).map((room,index)=>(
                <HotelCard key={room._id} room={room} index={index}/>
            ))}
        </div>

         {/* improved button styling */}
         
        <button
          onClick={()=> {navigate('/rooms'); scrollTo(0,0)}}
          className={`my-16 px-4 py-2 text-sm font-medium rounded transition-all cursor-pointer shadow ${theme === 'dark' ? 'border border-card-border bg-transparent text-[var(--text)] hover:bg-[rgba(255,255,255,0.03)]' : 'border border-gray-300 hover:bg-gray-100 bg-gray-50'}`}
        >
            View All Destinations
        </button>   
    </div>
  )
}

export default FeaturedDestination