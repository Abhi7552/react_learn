import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components';
import AppwriteServices from '../appwrite/appwrite_config';


function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        AppwriteServices.getPosts().then((posts) => {
            if (Array.isArray(posts)) {
                setPosts(posts);
            } else {
                setPosts([]);
            }
        })
    }, [])

    if (!Array.isArray(posts) || posts.length === 0) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold hover;text-gray-600'>
                                Login To Read Posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <h1 className='text-2xl font-bold text-center my-8'>All Posts</h1>
            <Container>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {posts.map((post) => (
                        <div key={post.$id} className='bg-white p-4 rounded-lg shadow-md'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home;