import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Signin() {
  const [formdata, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.id] : e.target.value
    })
  }
   const handlesubmit = async (e) => {
   try {
     e.preventDefault()
     setIsLoading(true)
     const res = await fetch('api/auth/signin', 
       {
         method:'POST',
         headers: {
           'Content-Type' : 'Application/json'
         },
         body:JSON.stringify(formdata)
       }
     )
 
     const data = await res.json()
     if(data?.success == false){
      setError(data.message)
      setIsLoading(false)
     }else{
      setIsLoading(false)
      navigate('/')
     
     }
   } catch (error) {
    setError('All fields are required !')
    setIsLoading(false)
   }
    
   }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl my-7 text-center font-semibold'>Sign in</h1>
      <form onSubmit={handlesubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='emial' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="text" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled = {isLoading} className='bg-slate-700 text-white p-3 hover:opacity-95 uppercase rounded-lg disabled:opacity-80'>{isLoading ? 'Loading...' : 'Sign in'}</button>
      </form>
      <p className='text-red-800'>{error}</p>
      <div className="flex items-center gap-2 mt-5">
        <p>Donot have an account?</p>
        <Link to={'/signup'}>
        <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
    </div>
  )
}
