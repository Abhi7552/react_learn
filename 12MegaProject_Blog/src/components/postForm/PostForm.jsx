import React, { useEffect, useCallback } from 'react'
import { set, useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index';
import AppwriteServices from '../../appwrite/appwrite_config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            featuredImage: post?.featuredImage || '',
            status: post?.status || 'active',
        },
    });

    const navigate = useNavigate();

    const userData = useSelector((state) => state.user.userData);

    const submit= async (data) => {
        if(post){
            const file=data.featuredImage[0]?AppwriteServices.uploadFile(data.featuredImage[0]):null;

            if(file){
                AppwriteServices.deleteFile(post.featuredImage);
            }

            const dbPost=await AppwriteServices.updatePost(post.$id,{
                ...data,
                featuredImage: file ? file.$id:undefined
            });

            if(dbPost){
                navigate(`/post/${dbPost.$id}`);
            }else{
                const file=await AppwriteServices.uploadFile(data.featuredImage[0]);

                if(file){
                    const fileId= file.$id;
                    data.featuredImage=fileId;
                    const dbPost=await AppwriteServices.createPost({
                        ...data,
                        userId: userData.$id
                    });
                    if(dbPost){
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === 'string') {
            return value.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

        }else{
            return '';
        }
    }, []);

    useEffect(() => {
        const subscription = watch((value,{name}) => {
            if(name === 'title') {
                setValue('slug', slugTransform(value.title,{ shouldValidate: true }));
            }
        });

        return () => subscription.unsubscribe();
    },[watch,slugTransform,setValue])

    return (
        <div className='max-w-3xl mx-auto p-4'>
            //Form may need to be adjusted based on design
            
            <form onSubmit={handleSubmit(submit)} className='flex flex-col gap-4'>
                <Input
                    label="Title"
                    name="title"
                    register={register}
                    required
                />
                <Input
                    label="Slug"
                    name="slug"
                    register={register}
                    required
                />
                <RTE
                    control={control}
                    name="content"
                    label="Content"
                />
                <Input
                    type="file"
                    label="Featured Image"
                    name="featuredImage"
                    register={register}
                />
                <Select
                    label="Status"
                    name="status"
                    options={[
                        { value: 'active', label: 'Active' },
                        { value: 'draft', label: 'Draft' },
                        { value: 'archived', label: 'Archived' }
                    ]}
                    register={register}
                />
                <Button type="submit" className='bg-blue-500 text-white'>Submit</Button>
            </form>
        </div>
    )
}

export default PostForm;