import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact({listing}) {
    const [Landlord, setLandLord] = useState(null)
    const [message, setMessage] = useState(null)

    const onChange = (e) => {
        setMessage(e.target.value)
    }

    useEffect(() => {
       ;(async () => {
        try {
            const res = await fetch(`/api/user/${listing.userRef}`)
            const data = await res.json()
            if(data.success === false){
                alert(data.message)
                return
            }
            setLandLord(data)
            
        } catch (error) {
            console.log(error)
        }
       })()
    }, [listing.userRef])

  return (
    <>
    { Landlord && (
        <div className='flex flex-col gap-2'>
            <p>Contact <span className='font-semibold'>{Landlord.username} </span>
            for 
            <span className='font-semibold'> {listing.name.toLowerCase()}</span>
            </p>
            <textarea 
            name="message"
            id="message"
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border  rounded-lg p-3'
            >
            </textarea>

            <Link to={`mailto:${Landlord.email}?subject=Regarding${listing.name}&body=${message}`}
            className='bg-slate-700 p-3  text-center text-white rounded-lg uppercase hover:opacity-95'
            >
             Send Message
            </Link>
        </div>
    )}
    </>
  )
}
