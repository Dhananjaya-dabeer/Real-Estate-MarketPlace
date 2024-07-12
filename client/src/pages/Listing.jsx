import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'

export default function Listing() {
    SwiperCore.use([Navigation])
    const [listing, setListing] = useState(null)
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const {listingId} = useParams()

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
  return (
    <main>
        {isLoading && <div className='flex items-center justify-center h-[90vh]'><img src='https://i.ibb.co/6w1XKWM/2407b512f6f2eec61cd2f3136242a025.gif' alt='Loading....' className='self-center'></img></div>}
        {error && <div className='flex items-center justify-center text-3xl h-[90vh]'>Some thing went wrong!</div>}
        {(listing && !error && !isLoading) &&  <>
            <Swiper navigation>
            {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                    <div className='h-[550px]'
                    style={{background:`url(${url}) center no-repeat`, backgroundSize:'cover' }}
                    >

                    </div>
                </SwiperSlide>
            ))}
            </Swiper>
            </>}
    </main>
  )
}
