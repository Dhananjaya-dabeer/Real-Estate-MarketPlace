import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'
import { FaBath, FaBed, FaChair, FaMapMarkedAlt, FaMapMarkerAlt, FaParking, FaShare } from 'react-icons/fa'

export default function Listing() {
    SwiperCore.use([Navigation])
    const [listing, setListing] = useState(null)
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const {listingId} = useParams()
    const [copied, setCopied] = useState(false)
useEffect(() => {
   ;(async() => {
    try {
        setError(false)
        setIsLoading(true)
        const res = await fetch (`/api/listing/get/${listingId}`)
        const data = await res.json()
        if(data.success === false){
            setError(data.message)
            setIsLoading(flase)
            return
        }
        setListing(data)
        setIsLoading(false)
    } catch (error) {
     setError(error.message)  
     setIsLoading(false) 
    }
   })()
    },[listingId])
    console.log(listing)
  return (
    <main>
        {isLoading && <div className='flex items-center justify-center h-[90vh]'><img src='https://i.gifer.com/ZKZg.gif' alt='Loading....' className='self-center w-12 h-12'></img></div>}
        {error && <div className='flex items-center justify-center text-3xl h-[90vh]'>Some thing went wrong!</div>}
        {(listing && !error && !isLoading) &&  <>
            <Swiper navigation>
            {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                    <div className='h-[500px]'
                    style={{background:`url(${url}) center no-repeat`, backgroundSize:'cover' }}
                    >

                    </div>
                </SwiperSlide>
            ))}
            </Swiper>
            <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
                {listing.name} - &#8377;
                {listing.offer
                ? listing.discountPrice.toLocaleString('en-IN')
                : listing.regularPrice.toLocaleString('en-IN')
                }
                {listing.type === 'rent' && '/ month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600 text-sm'>
                <FaMapMarkerAlt className='text-green-700' />
                {listing.address}
            </p>
            <div className='flex gap-4 '>
                <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                    {+listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                </p>
                {listing.offer && (
                    <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                        {+listing.regularPrice - +listing.discountPrice} OFF
                    </p>
                )}
            </div>
            <p className='text-slate-800 '>
              <span className='font-semibold text-black'>Description -   </span>
              {listing.description}
            </p>
            <ul className='text-green-800 text-sm font-semibold flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBed className='text-lg'/>
                {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBath className='text-lg'/>
                {listing.bdathooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaParking className='text-lg'/>
                {listing.parking ? `Parking Spot` : `No Parking`}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaChair className='text-lg'/>
                {listing.furnished  ? `Furnished` : `Unfurnished`}
              </li>
            </ul>
          </div>
            </>}

    </main>
  )
}
