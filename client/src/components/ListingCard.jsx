import React from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
export default function ListingCard({listing}) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
        <Link to={`/listing/${listing._id}`}>
            <img 
             src={listing.imageUrls[0]}
             alt="listing cover"
             className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-all duration-300'
             />
             <div className='p-3 flex flex-col gap-2 w-full'>
                <p className='truncate text-lg text-slate-700 font-semibold'>{listing.name}</p>
                <div className='flex items-center gap-1 '>
                    <MdLocationOn className='w-4 h-4 text-green-700'/>
                    <p className='w-full text-sm text-gray-600 truncate'>{listing.address}</p>
                </div>
                <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
                <p className='font-semibold text-slate-500 mt-2'>&#x20b9; {
                     
                    listing.offer? listing.discountPrice.toLocaleString('en-In') : listing.regularPrice.toLocaleString('en-In')
                    }
                    {listing.type === 'rent' && ' / month'}
                    </p>
                    <div className='font-bold text-xs text-slate-800 flex gap-4'>
                        <div className="">
                            <p>{listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}</p>
                        </div>
                        <div className="">
                            <p>{listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}</p>
                        </div>
                    </div>
             </div>
        </Link>
    </div>
  )
}
