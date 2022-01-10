
import React, { useState, useEffect } from 'react';
import { GetPost, PostComment } from '../api'


const DetailPage = (e) => {

    const [data, setdata] = useState({})
    const [comment, setcomment] = useState("")

    const postComment = async () => {
        const id = data._id;
        const res = await PostComment({ id, comment })
        console.log(res)
    }

    useEffect(async () => {

        console.log("rahul")
        const res = await GetPost();
        console.log(res)
        const x = res.data.find(val => val._id == e.match.params.id)
        setdata(x)

    }, [])


    if (data.description == undefined) {
        return (
            <h2>Loading..</h2>
        )
    } else {
        return (
            <div class=" row border justify-content-center pt-4 m-0" style={{ minHeight: "86vh" }}>

                <div class="col-lg-4 shadow-lg p-3">

                    <img src={data.ImgUrl} width="80%" class="mx-5" height="300px" />

                    <div class="d-flex m-0 mt-3 justify-content-between">
                        <h5 >Author : {data.author}</h5>
                        <h5 >{data.create.split("T")[0].split("-").reverse().join("/")}</h5>
                    </div>

                    <div class="border-top pt-3">
                        <h3>{data.title}</h3>
                        <p>{data.description}</p>
                    </div>
                </div>

                <div class="col-lg-4 mt-lg-0 mt-5 ms-0 ms-lg-5 shadow-lg p-3">
                    <h3>Comments </h3>

                    <div class="row ">
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Post Comments</label>
                            <textarea class="form-control" value={comment} onChange={(e) => setcomment(e.target.value)} id="exampleFormControlTextarea1" rows="2"></textarea>
                        </div>
                        <button class="btn btn-primary ms-auto me-3 col-md-2" onClick={postComment}>Post</button>
                    </div>

                    {data.comments.length !== 0 &&
                        <div style={{height:"350px", marginTop:"20px", overflow:"auto"}}>
                            <h6>Older Comments</h6>
                            {data.comments.map(val => {
                                console.log(val)
                                return (
                                    <p class="border-bottom mb-3 ps-2 rounded-3">{val}</p>
                                )
                            })}
                        </div>

                    }



                </div>
            </div>
        )
    }




}

export default DetailPage
