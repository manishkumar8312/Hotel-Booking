import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { UserButton } from '@clerk/clerk-react'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between py-3 px-4 md:px-8 border-b border-gray-300 bg-white transition-all duration-300'>
        <Link to="/">
        <img src={assets.logo} alt="logo" className='h-9 invert opacity-80'/>
        </Link>
        <UserButton/>
    </div>
  )
}

export default Navbar