import React, { useEffect, useCallback, useState } from 'react'
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
    const userData = useSelector((state) => state.auth.userData);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Slugify function: replaces spaces with '-' and removes invalid chars
    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        } else {
            return '';
        }
    }, []);

    // Auto-update slug when title changes
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                const newSlug = slugTransform(value.title);
                setValue('slug', newSlug, { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const submit = async (data) => {
        setError("");
        setLoading(true);
        try {
            if (!userData) {
                setError("You must be logged in to submit a post.");
                setLoading(false);
                return;
            }
            if (!data.title || !data.slug) {
                setError("Title and slug are required.");
                setLoading(false);
                return;
            }
            // Log submission data for debugging
            console.log('Submitting post data:', data);
            let fileId = undefined;
            if (data.featuredImage && data.featuredImage[0]) {
                const file = await AppwriteServices.uploadFile(data.featuredImage[0]);
                if (file && file.$id) fileId = file.$id;
            }
            const postPayload = {
                ...data,
                featuredImage: fileId,
                userId: userData.$id,
            };
            // Remove file array from payload
            delete postPayload.featuredImage;
            if (fileId) postPayload.featuredImage = fileId;
            const dbPost = await AppwriteServices.createPost(postPayload);
            if (dbPost && dbPost.$id) {
                navigate(`/post/${dbPost.$id}`);
            } else {
                setError("Failed to create post. Please try again.");
            }
        } catch (err) {
            setError(err.message || JSON.stringify(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='max-w-3xl mx-auto p-4'>
            {error && <div className='text-red-500 mb-2'>{error}</div>}
            {loading && <div className='text-blue-500 mb-2'>Submitting...</div>}
            <form onSubmit={handleSubmit(submit)} className='flex flex-col gap-4'>
                <Input
                    {...register('title', { required: true })}
                    label="Title"
                    required
                />
                <Input
                    {...register('slug', { required: true })}
                    label="Slug"
                    required
                    readOnly
                />
                <RTE
                    control={control}
                    name="content"
                    label="Content"
                />
                <Input
                    type="file"
                    label="Featured Image"
                    {...register('featuredImage')}
                />
                <Select
                    {...register('status')}
                    options={[
                        { value: 'active', label: 'Active' },
                        { value: 'draft', label: 'Draft' },
                        { value: 'archived', label: 'Archived' }
                    ]}
                    label="Status"
                />
                <Button type="submit" className='bg-blue-500 text-white' disabled={loading}>Submit</Button>
            </form>
        </div>
    );
}

export default PostForm;