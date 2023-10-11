import React , {useCallback} from 'react'
import {useForm} from 'react-hook-form'
import { Button , Input , Select } from '../index'
import RTE from 'index.js'
import Appwriteservice from '../../Appwrite/config'
import {useNavigate, useNevigator  } from 'react-router-dom'
import{ useSelector } from 'react-redux'

function Postform({post}) {

const {register , handleSubmit , 
    watch , setValue , control , getValues} = useForm({
        defaultValues:{
            title : post?.title || '' ,
            slug : post?.slug || '',
            content : post?.content || '',
            status : post?.status || 'active',
           
        }
    })
    const navigate = useNavigate();
    const userData = useSelector(state=>state.user.userData)

    const Submit = async(data)=>{
        if (data) {
            const file = data.image[0] ? Appwriteservice.uploadFile(data.image[0]) : null;

            if (file) {
                Appwriteservice.deleteFile(post.featuredImage)
            }


            const DBpost = await Appwriteservice.updatePost(post.$id , {
                ...data ,
                 featuredImage: file ? file.$id : undefined,
            });

            if (DBpost) {
                navigate(`/post/${DBpost.$id}`);
            }

        }
        else{
            const File = await Appwriteservice.uploadFile(data.image[0]);

            if (File) {
                const fileId = File.$id;
                data.featuredImage = fileId;
                    const dbpost = await Appwriteservice.createPost({...data , userId: userData.$id} )

                    if (dbpost) {
                        navigate(`/post/${dbpost.$id}`);
                    }
            }
            
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);


    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);
  return (

    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
    <div className="w-2/3 px-2">
        <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
        />
        <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
    </div>
    <div className="w-1/3 px-2">
        <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
        />
        {post && (
            <div className="w-full mb-4">
                <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg"
                />
            </div>
        )}
        <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
            {post ? "Update" : "Submit"}
        </Button>
    </div>
</form>
  )    
}

export default Postform