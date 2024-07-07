import React, { useState } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage' 
import { app } from "../firebase"
export default function CreateListing() {
    const [files, setFiles] = useState([])
    const [formData, setFormData] = useState({
        imageUrls:[]
    })
    const [imageUploadError, setImageUploadError]  = useState(false)
    const [uploading, setUploading] = useState(false)
    // const handleImageSubmit = () => {
    //   if(files.length > 0 && files.length + formData.imageUrls.length < 7){
    //     setUploading(true)
    //     setImageUploadError(false)
    //     let promises = []
    //     for (let i = 0; i< files.length; i++){
    //         promises.push(storeImage(files[i]))
    //     }
    //     Promise.all(promises).then((urls) => {
    //         setFormData({...formData, imageUrls:formData.imageUrls.concat(urls)})
    //         // setImageUploadError(false)
    //         setUploading(false)
    //     }).catch(() => {
    //         setImageUploadError('Image upload failed')
    //         setUploading(false)
    //     })
    //   }else{
    //     if(files.length == 0) {setImageUploadError('At least one image is required to upload') }
    //      else{
    //         setImageUploadError('You can only upload 6 images per listing')}
    //     setUploading(false)
    //   }
    // }

    // const storeImage = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const storage = getStorage(app)
    //         const fileName = new Date().getTime() + file.name
    //         const storageRef = ref(storage, fileName)
    //         const uploadTask = uploadBytesResumable(storageRef, file);
    //         uploadTask.on('state_changed',
    //         () => {

    //         },  
    //         (error) => {
    //             reject(error)
    //         }, 
    //         () => {
    //             getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
    //                 resolve(downloadUrl)
    //             })
    //         })
    //     })
    // }

    const handleImageSubmit = () => {
          if(files.length > 0 && files.length + formData.imageUrls.length < 7){
            setUploading(true)
            setImageUploadError(false)
            let promises = []
            for (let i = 0; i< files.length; i++){
                promises.push(storeImage(files[i]))
            }
            Promise.all(promises).then((urls) => {
                setFormData({...formData, imageUrls:formData.imageUrls.concat(urls)})
                // setImageUploadError(false)
                setUploading(false)
            }).catch(() => {
                setImageUploadError('Image upload failed')
                setUploading(false)
            })
          }else{
            if(files.length == 0) {setImageUploadError('At least one image is required to upload') }
             else{
                setImageUploadError('You can only upload 6 images per listing')}
            setUploading(false)
          }
        }
    
        const storeImage = async(file) => {
 
            return new Promise((resolve, reject) => {
                let base64String 
                const reader = new FileReader()
                reader.onload = async function(event){
                    base64String = event.target.result.split(',')[1]
                    if(!base64String){
                        throw new Error('Invalid base string')
                    }
                    let res = await fetch (`https://api.imgbb.com/1/upload?expiration=15552000&key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
                        method:'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body:new URLSearchParams({image:base64String})
                    })
            
                   const data = await res.json()
                   if(data.success){
                    resolve(data.data.url)
                   } else {
                    reject(new Error('Image upload failed: ' + data.error.message));
                }
                }
                reader.readAsDataURL(file);
                            
            })
        }

    

    const handleDeleteImage = (index) => {
        setFormData({ ...formData, imageUrls:formData.imageUrls.filter((_, ind) => ind !== index )})
    }
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
                <input onChange={(e) => setFiles(e.target.files)} type="file" id='images' accept='image/*' className='border-gray-300 p-3 border w-full rounded' multiple/>
                <button className='p-3 border border-green-700 text-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80' type='button' disabled={uploading} onClick={handleImageSubmit}>{uploading ? 'uploading...' : 'upload'}</button>
              </div>
              <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
              {formData.imageUrls.map((url, index) => (
                <div key={url} className='flex items-center justify-between p-3 border-2'>
                    <img src={url} alt="Listed image" className='w-32 h-20 rounded-lg' />
                    <button onClick={() => handleDeleteImage(index)} type='button' className='text-red-700 uppercase p-3 rounded-lg hover:opacity-80'>Delete</button>
                </div>
              ))}
              <button className='p-3 bg-slate-700 text-white uppercase rounded-lg disabled:opacity-80'>Create Listing</button>
             </div>
            </form>
    </main>
  )
}
