import React from 'react'
import authService from '../appwrite/appwrite_config';
import { Link } from 'react-router-dom';

function PostCard({$id,title, featuredImage, createdAt, author }) {
  return (
    <Link to={`/post/${$id}`} className='block p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200'>
        <div className='mb-4 overflow-hidden rounded-lg'>
            <img src={authService.getFilePreview(featuredImage)} alt={title} className='w-full h-48 object-cover' />
            <h2 className='mt-2 text-xl font-semibold'>{title}</h2>
            <p className='text-gray-600 text-sm'>By {author && author.name ? author.name : 'Unknown Author'} on {createdAt ? new Date(createdAt).toLocaleDateString() : ''}</p>
            
        </div>
    </Link>
  )
}

export default PostCard;