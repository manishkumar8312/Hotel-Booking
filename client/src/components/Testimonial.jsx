import React from 'react'
import Title from './Title'
import { testimonials } from '../assets/assets'
import StarRating from './StarRating'
import { useTheme } from '../contexts/ThemeContext'

const Testimonial = () => {
  const { theme } = useTheme();
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-surface pt-20 pb-30'>
        <Title title="What Our Guest Say" subTitle="Discover why discerning travelers consistently choose QuickStay for their exclusive and unforgettable experiences."/>
        <div className="flex flex-wrap items-center gap-6 mt-20">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-[var(--surface)] flex flex-col justify-center items-center text-center p-6 rounded-xl shadow-card border border-card-border">
                        <div className="flex flex-col items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-playfair text-lg text-[var(--text)]">{testimonial.name}</p>
                                <p className="text-muted text-sm">{testimonial.address}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            <StarRating />
                        </div>
                        <p className="text-muted max-w-90 mt-4 mb-5">"{testimonial.review}"</p>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default Testimonial