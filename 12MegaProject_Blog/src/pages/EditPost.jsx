import React, { useState,useEffect } from 'react'
import { Container, PostForm } from '../components';
import AppwriteServices from '../appwrite/appwrite_config';
import { useNavigate,useParams } from 'react-router-dom';



function EditPost() {
    const [post,setPost]=useState(null);
    const navigate = useNavigate();
    const {slug} = useParams();


    useEffect(()=>{
        if(slug){
            AppwriteServices.getPost(slug).then((post)=>{
                if(post){
                    setPost(post);
                } else {
                    navigate('/');
                }
            }).catch((error) => {
                console.error("Error fetching post:", error);
                navigate('/404');
            });
        }
    },[slug, navigate]);

  return post?(
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ):null;
}

export default EditPost;