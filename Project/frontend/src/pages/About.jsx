import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>About <span className='text-gray-700 font-medium'>Us</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
        <p>Welcome to our clinic! We are a team of dedicated professionals committed to providing the best care for our patients.</p>
        <p>CareBot healthcare is dedicated to providing high-quality medical services to our community.</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>To improve the health and well-being of our patients through compassionate care and innovative treatments.</p>
      </div>
      </div>
    <div className='text-xl my-4'>
      <p>Why <span clasName='text-gray-700 font-semibold'>Choose Us</span></p>
    </div>
    <div className='flex flex-col md:flex-row gap-10 text-sm text-gray-600'>
      <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300  text-gray-600 cursor-pointer'>
        <b>Efficiency:</b>
        <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
      </div>
      <div  className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300  text-gray-600 cursor-pointer'>
        <b>Convenience:</b>
        <p>Access to our services from the comfort of your home or office.</p>
      </div>
      <div  className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300  text-gray-600 cursor-pointer'>
    <b>Personalization</b>
      <p>Tailored healthcare solutions that cater to your unique needs and preferences.</p>
      </div>
    </div>
    </div>
  )
}
export default About