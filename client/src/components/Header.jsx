import React from 'react'
import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'
export default function Header() {
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
       <Link to={'/'}>
       <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
          <span className='text-slate-500'>Dabeer</span>
          <span className='text-slate-700'>Estate</span>
        </h1>
       </Link>
        <form className='bg-slate-100 flex items-center p-3 rounded-lg'>
          <input
           type="text"
           className='bg-transparent focus:outline-none w-24 sm:w-64' 
           placeholder='Search...'
           />
           <FaSearch className ='text-slate-600 cursor-pointer'/>
        </form>
        <ul className='flex items-center gap-4 font-medium'>
         <Link to={'/'}> <li className='text-slate-700 hover:underline hidden sm:inline'>Home</li></Link>
          <Link to={'/about'}><li className='text-slate-700 hover:underline hidden sm:inline'>About</li></Link>
          <Link to={'/signin'}>
          <li className='text-slate-700 hover:underline'>Sign in</li></Link>
        </ul>
      </div>
    </header>
  )
}
