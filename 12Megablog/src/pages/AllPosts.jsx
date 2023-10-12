import React,  {useEffect, useState}from 'react'
import { Container, PostCart } from '../components'
import  appwriteservices from '../Appwrite/config'

function AllPosts() {
    const [Posts, setPosts] = useState([])

    appwriteservices.getPosts
    useEffect(()=>{},[])

    appwriteservices.getPosts([]).then((posts)=>{
        if (posts) {
                setPosts(posts.documents)
        }
    }).catch()

  return (
    <div className='w-full py-8'>

        <Container>
        <div className='flex flex-wrap'>
        {Posts.map((post)=>{
            
            <div     key={post.$id}  className='p-2 w-1/4'>
                <PostCart 
            post={post} />
              
            </div>
        })}

        </div>
               
        </Container>
        

    </div>
  )
}

export default AllPosts