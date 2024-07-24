import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'
import ListingCard from '../components/ListingCard'

export default function Home() {

  const [offerListing, setOfferListing] = useState([])
  const [rentListing, setRentListing] = useState([])
  const [saleListing, setSaleListing] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  console.log(offerListing)
  SwiperCore.use([Navigation])
  useEffect(() => {
    setIsLoading(true)
    const fetchOfferListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`)
        const data = await res.json()
        setOfferListing(data)
        fetchRentListing()
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
    fetchOfferListing()
    const fetchRentListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`)
        const data = await res.json()
        setRentListing(data)
        fetchSaleListing()
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
    const fetchSaleListing = async () => {
     try {
       const res = await fetch(`/api/listing/get?type=sale&limit=4`)
       const data = await res.json()
       setSaleListing(data)
       setIsLoading(false)
     } catch (error) {
      console.log(error)
      setIsLoading(false)
     }

    }
  },[])
  
  return (
    <div>
   {isLoading ? <div className='flex items-center justify-center h-screen'><img src='https://i.gifer.com/ZKZg.gif' alt='Loading....' className='self-center w-12 h-12'></img></div> : <>
      {/* top */}
      <div className='flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next 
            <span className='text-slate-500'> perfect</span>
            <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Dabeer Estate is the best place to find your next perfect place to live
          <br />
          We have wide range of properties for you to choose from
        </div>
        <Link to ={'/search'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
         let's get started...
        </Link>
      </div>
      {/* swiper */}
      <Swiper navigation>
        {
          offerListing.length && offerListing.map(listItem => (
            <SwiperSlide>
              <div style={{background:`url(${listItem.imageUrls[0]})center no-repeat` , backgroundSize:"cover" }} key={listItem._id} className="h-[500px]"></div>
            </SwiperSlide>
          ))
        }
      </Swiper>
      {/* listing results for offer, sale and rent */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
       {offerListing.length > 0 &&
         <div className="">
         <div className="my-3">
           <h2 className='text-slate-600 text-2xl font-semibold'>Recent offers</h2>
           <Link className='text-blue-800 text-sm hover:underline' to={'search?offer=true'}>
             show more offers
           </Link>
         </div>
         <div className="flex flex-wrap gap-4">
           { offerListing.map(listItem => (
             <ListingCard listing={listItem} key={listItem._id}/>
           ))}
         </div>
       </div>
       }
       {rentListing.length > 0 &&
         <div className="">
         <div className="my-3">
           <h2 className='text-slate-600 text-2xl font-semibold'>Recent places for rent</h2>
           <Link className='text-blue-800 text-sm hover:underline' to={'search?type=rent'}>
             show more places for rent
           </Link>
         </div>
         <div className="flex flex-wrap gap-4">
           { rentListing.map(listItem => (
             <ListingCard listing={listItem} key={listItem._id}/>
           ))}
         </div>
       </div>
       }
       {saleListing.length > 0 &&
         <div className="">
         <div className="my-3">
           <h2 className='text-slate-600 text-2xl font-semibold'>Recent places for sale</h2>
           <Link className='text-blue-800 text-sm hover:underline' to={'search?type=sale'}>
             show more places for sale
           </Link>
         </div>
         <div className="flex flex-wrap gap-4">
           { saleListing.map(listItem => (
             <ListingCard listing={listItem} key={listItem._id}/>
           ))}
         </div>
       </div>
       }
      </div>
    </>}
    </div>
  )
}
