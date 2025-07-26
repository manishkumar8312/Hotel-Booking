import React from 'react'
import { assets } from '../assets/assets'

const StarRating = ({ rating = 5 }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }, (_, i) => (
        <img key={i} src={i < rating ? assets.starIconFilled : assets.starIconOutlined} alt="star" className="w-3.5 h-3.5" />
      ))}
    </div>
  )
}

export default StarRating