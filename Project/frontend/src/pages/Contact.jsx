import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10'>
        <p>Contact <span className='text-gray-700 font-semibold'>Us</span></p>
      </div>
    <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
      <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
    <div className='flex flex-col justify-center item-start gap-6 md:w-2/4 text-sm text-gray-600'>
      <p className='font-semibold text-lg text-gray-600'>Our Office</p>
      <p className='text-gray-500'>123 Main Street, City, State 12345</p>
      <p className='text-gray-500'>Phone: (123) 456-7890</p>
      <p className='text-gray-500'>Email: info@carebot.com</p>
      <p className='text-gray-500'>Learn more about our services and openings.</p>
      
      <button className='border border-black bg-blue-300 text-black py-4 px-2 w-1/3 text-sm hover:bg-blue-500 hover:text-black'>Explore Jobs</button>
    </div>
    </div>
    </div>
  )
}

export default Contact