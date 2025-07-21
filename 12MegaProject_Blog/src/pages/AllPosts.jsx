import React,{useState,useEffect} from 'react'
import AppwriteServices from '../appwrite/appwrite_config';
import { Container ,PostCard} from '../components';


function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        AppwriteServices.getPosts([]).then((posts)=>{
            if (Array.isArray(posts)) {
                setPosts(posts);
            } else {
                setPosts([]);
            }
        })
    },[]);


  return (
    <div className='py-8'>
        <h1 className='text-2xl font-bold text-center my-8'>All Posts</h1>
        <Container>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.$id} className='bg-white p-4 rounded-lg shadow-md'>
                            <PostCard {...post} />
                        </div>
                    ))
                ) : (
                    <div className='col-span-full text-center text-gray-500'>No posts found.</div>
                )}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts;