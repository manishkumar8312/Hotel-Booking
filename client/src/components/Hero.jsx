import React from 'react'
import { assets, cities } from '../assets/assets'
import { useTheme } from '../contexts/ThemeContext'

const Hero = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`relative flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen transition-colors duration-300 ${theme === 'dark' ? 'text-[var(--text)]' : 'text-white'}`}
    >
      {/* removed overlay so the hero image stays unchanged in dark mode */}

      <div className="relative z-10 max-w-3xl">
        <p className={`${theme === 'dark' ? 'bg-[rgba(255,255,255,0.04)] text-muted' : 'bg-[#49B9FF]/50'} px-3.5 py-1 rounded-full mt-20 inline-block`}>
          The Ultimate Hotel Experience
        </p>

        <h1 className={`font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4 ${theme === 'dark' ? 'text-[var(--text)]' : ''}`}>
          Discover Your Perfect Gateway Destination
        </h1>

        <p className={`max-w-130 mt-2 text-sm md:text-base ${theme === 'dark' ? 'text-muted' : ''}`}>
          Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your journey today.
        </p>

        {/* form: keep light-mode exactly same, add subtle dark styling */}
        <form className={`rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto transition-colors duration-200 ${theme === 'dark' ? 'bg-[rgba(255,255,255,0.03)] text-[var(--text)] border border-card-border' : 'bg-gray-700 text-white'}`}>
          <div>
            <div className='flex items-center gap-2'>
              <img src={assets.calenderIcon} alt="Calender" className='h-4'/>
              <label htmlFor="destinationInput">Destination</label>
            </div>
            <input list='destinations' id="destinationInput" type="text"
              className={`rounded px-3 py-1.5 mt-1.5 text-sm outline-none transition-colors duration-150 ${theme === 'dark' ? 'bg-transparent border border-card-border text-[var(--text)]' : 'border border-gray-200 bg-white text-black'}`}
              placeholder="Type here" required />
            <datalist id='destinations'>
              {cities.map((city,index)=>(
                <option value={city} key={index}/>
              ))}
            </datalist>
          </div>

          <div>
            <div className='flex items-center gap-2'>
              <img src={assets.calenderIcon} alt="Calender" className='h-4'/>
              <label htmlFor="checkIn">Check in</label>
            </div>
            <input id="checkIn" type="date" className={`rounded px-3 py-1.5 mt-1.5 text-sm outline-none ${theme === 'dark' ? 'bg-transparent border border-card-border text-[var(--text)]' : 'border border-gray-200'}`} />
          </div>

          <div>
            <div className='flex items-center gap-2'>
              <img src={assets.calenderIcon} alt="Calender" className='h-4'/>
              <label htmlFor="checkOut">Check out</label>
            </div>
            <input id="checkOut" type="date" className={`rounded px-3 py-1.5 mt-1.5 text-sm outline-none ${theme === 'dark' ? 'bg-transparent border border-card-border text-[var(--text)]' : 'border border-gray-200'}`} />
          </div>

          <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
            <label htmlFor="guests">Guests</label>
            <input min={1} max={4} id="guests" type="number"
              className={`rounded px-3 py-1.5 mt-1.5 text-sm outline-none max-w-16 transition-colors duration-150 ${theme === 'dark' ? 'bg-transparent border border-card-border text-[var(--text)]' : 'border border-gray-200'}`}
              placeholder="0" />
          </div>

          <button className={`flex items-center justify-center gap-1 rounded-md py-3 px-4 my-auto cursor-pointer max-md:w-full max-md:py-1 transition-colors duration-150 ${theme === 'dark' ? 'bg-[var(--primary)] text-white' : 'bg-gray-800 text-white'}`}>
            <img src={assets.searchIcon} alt="searchIcon" className='h-7'/>
            <span>Search</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Hero