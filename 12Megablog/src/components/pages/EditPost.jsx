import React, {useEffect, useState} from 'react'
import Container from '../container/Container'
import Postform from '../post-form/Postform'
import  appwriteservices from '../Appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'


function EditPost() {
   const [Post , setPosts] = useState(null)

   const {}  = useParams()
   const navigate = useNavigate()

   useEffect(() => {
    if (slug) {
        appwriteservices.getPost(slug).then((post) => {
            if (post) {
                setPosts(post)
            }
        })
    } else {
        navigate('/')
    }
}, [slug, navigate])
return post ? (
<div className='py-8'>
    <Container>
        <Postform post={post} />
    </Container>
</div>
) : null
}

export default EditPost