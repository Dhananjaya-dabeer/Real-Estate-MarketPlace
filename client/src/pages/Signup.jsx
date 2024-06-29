import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl my-7 text-center font-semibold'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username'/>
        <input type="text" placeholder='emial' className='border p-3 rounded-lg' id='emial' />
        <input type="text" placeholder='password' className='border p-3 rounded-lg' id='password' />
        <button className='bg-slate-700 text-white p-3 hover:opacity-95 uppercase rounded-lg disabled:opacity-80'>Sign up</button>
      </form>
      <div className="flex items-center gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={'/signin'}>
        <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}
