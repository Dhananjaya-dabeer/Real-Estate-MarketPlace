import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Create a Listing</h1>
        <form action="" className='flex flex-col sm:flex-row gap-4'>
              <div className='flex flex-col gap-4 flex-1'>
              <input type="text" id='name' placeholder='Name'  className="p-3 border rounded-lg " maxLength='62' minLength='10' required/>
                <textarea type="text" id='description' placeholder='Description'  className="p-3 border rounded-lg "  required/>
                <input type="text" id='address' placeholder='Address'  className="p-3 border rounded-lg " required/>
                <div className='flex gap-6 flex-wrap '>
               <div className='flex gap-2'>
               <input type="checkbox" id='sell' className='w-5' />
               <span>Sell</span>
               </div>
               <div className='flex gap-2'>
               <input type="checkbox" id='Rent' className='w-5' />
               <span>Rent</span>
               </div>
               <div className='flex gap-2'>
               <input type="checkbox" id='parking' className='w-5' />
               <span>Parking Spot</span>
               </div>
               <div className='flex gap-2'>
               <input type="checkbox" id='furnished' className='w-5' />
               <span>Furnished</span>
               </div>
               <div className='flex gap-2'>
               <input type="checkbox" id='offer' className='w-5' />
               <span>Offer</span>
               </div>
              </div>
              <div className="flex flex-wrap  gap-6">
                <div className="flex items-center gap-2">
                    <input type="number" id='bedrooms' required min='1' max='10' className='p-3 border border-gray-300 rounded-lg'/>
                    <p>Beds</p>
                </div>
                <div className="flex items-center gap-2">
                    <input type="number" id='bathrooms' required min='1' max='10' className='p-3 border border-gray-300 rounded-lg'/>
                    <p>Baths</p>
                </div>
                <div className="flex items-center gap-2">
                    <input type="number" id='regularPrice' required min='1' max='10' className='p-3 border border-gray-300 rounded-lg w-28 '/>
                    <div className="flex flex-col items-center">
                    <p>Regular price</p>
                    <span className='text-xs'>($ / Month)</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <input type="number" id='discountPrice' required min='1' max='10' className='p-3 border border-gray-300 rounded-lg w-28'/>
                    <div className="flex flex-col items-center">
                    <p>Discounted price</p>
                    <span className='text-xs'>($ / Month)</span>
                    </div>
                </div>
              </div>
              </div>
             <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'>Images:
                <span className='font-normal text-gray-600 ml-2'>The first image will be the cover(max 6)</span>
                </p>
                
             <div className='flex gap-4'>
                <input type="file" id='images' accept='image/*' className='border-gray-300 p-3 border w-full rounded' multiple/>
                <button className='p-3 border border-green-700 text-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
              </div>
              <button className='p-3 bg-slate-700 text-white uppercase rounded-lg disabled:opacity-80'>Create Listing</button>
             </div>
            </form>
    </main>
  )
}
