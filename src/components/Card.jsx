import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({name}) => {
  return (
    <div className='w-[50%] flex items-center p-5 justify-between h-20 bg-white shadow-xl'>
        <div className='flex items-center gap-4'>
            <div className="bg-blue-400 h-10 rounded-full w-10">
              <img className='rounded-full h-full w-full object-cover' src={name.profileImg} alt="" />
            </div>
            <div>
              <h1 className='text-lg'>{name.firstName} {name.lastName}</h1>
              <p>@{name.bio}...</p>
            </div>
        </div>
        <Link to={"/chat/"+name._id}>
          <button className='px-5 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition'>chat</button>
        </Link>
    </div>
  )
}

export default Card