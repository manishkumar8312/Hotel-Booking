import React from 'react'
import { assets } from '../assets/assets'
import { useTheme } from '../contexts/ThemeContext'

const Footer = () => {
  const { theme } = useTheme();

  return (
    <div className={`${theme === 'dark' ? 'bg-surface text-muted' : 'bg-[#F6F9FC] text-gray-500/80'} pt-8 px-6 md:px-16 lg:px-24 xl:px-32`}>
            <div className='flex flex-wrap justify-between gap-12 md:gap-6'>
                <div className='max-w-80'>
                    <img src={assets.logo} alt="logo" className={`mb-4 h-8 md:h-9 ${theme === 'dark' ? 'opacity-90' : 'invert opacity-80'}`} />
                    <p className={`${theme === 'dark' ? 'text-muted' : 'text-sm'}`}>
                        Discover the world's most luxurious hotels and resorts with QuickStay. Book your next adventure today!
                    </p>
                    <div className='flex items-center gap-3 mt-4'>
                        <img src={assets.instagramIcon} alt="instagram-icon" className='w-6' />
                        <img src={assets.facebookIcon} alt="facebook-icon" className='w-6' />
                        <img src={assets.twitterIcon} alt="twitter-icon" className='w-6' />
                        <img src={assets.linkendinIcon} alt="linkedin-icon" className='w-6' />
                    </div>
                </div>

                <div>
                    <p className={`font-playfair text-lg ${theme === 'dark' ? 'text-[var(--text)]' : 'text-gray-800'}`}>COMPANY</p>
                    <ul className={`mt-3 flex flex-col gap-2 ${theme === 'dark' ? 'text-muted text-sm' : 'text-sm'}`}>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Press</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Partners</a></li>
                    </ul>
                </div>

                <div>
                    <p className={`font-playfair text-lg ${theme === 'dark' ? 'text-[var(--text)]' : 'text-gray-800'}`}>SUPPORT</p>
                    <ul className={`mt-3 flex flex-col gap-2 ${theme === 'dark' ? 'text-muted text-sm' : 'text-sm'}`}>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Safety Information</a></li>
                        <li><a href="#">Cancellation Options</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Accessibility</a></li>
                    </ul>
                </div>

                <div className='max-w-80'>
                    <p className={`font-playfair text-lg ${theme === 'dark' ? 'text-[var(--text)]' : 'text-gray-800'}`}>STAY UPDATED</p>
                    <p className={`${theme === 'dark' ? 'text-muted' : 'mt-3 text-sm'}`}>
                        Subscribe to our newsletter for inspiration and special offers.
                    </p>
                    <div className='flex items-center mt-4'>
                        <input
                          type="text"
                          className={`rounded-l h-9 px-3 outline-none ${theme === 'dark' ? 'bg-transparent border border-card-border text-[var(--text)]' : 'bg-white border border-gray-300'}`}
                          placeholder='Your email'
                        />
                        <button className={`${theme === 'dark' ? 'flex items-center justify-center bg-[var(--primary)] text-white h-9 w-9 aspect-square rounded-r' : 'flex items-center justify-center bg-black h-9 w-9 aspect-square rounded-r'}`}>
                            <img src={assets.arrowIcon} alt="arrow-icon" className={`${theme === 'dark' ? 'w-3.5' : 'w-3.5 invert'}`}/>
                        </button>
                    </div>
                </div>
            </div>

            <hr className={`${theme === 'dark' ? 'border-card-border mt-8' : 'border-gray-300 mt-8'}`} />
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>
                  &copy; {new Date().getFullYear()} <span className={`${theme === 'dark' ? 'text-[var(--text)] font-medium' : ''}`}>QuickStay</span>. All rights reserved.
                </p>
                <ul className={`flex items-center gap-4 ${theme === 'dark' ? 'text-muted' : ''}`}>
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Terms</a></li>
                    <li><a href="#">Sitemap</a></li>
                </ul>
            </div>
        </div>
  )
}

export default Footer