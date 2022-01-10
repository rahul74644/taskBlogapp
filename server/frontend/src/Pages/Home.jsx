
import React, { useState, useEffect } from 'react'
import MainCat from '../components/MainCat'
import { GetPost } from '../api'

const Home = () => {

    const [blogs, setblogs] = useState([])

    useEffect( async () => {
        const res = await GetPost();
        setblogs(res.data)
    }, [])

    return (
        <>
            <div class="row m-0">
                <img src="https://www.ucost.in/blog/wp-content/uploads/2016/02/about-blg.jpg" width="100%" height="100%" />
            </div>
            <MainCat data={blogs} />
        </>
    )
}

export default Home
