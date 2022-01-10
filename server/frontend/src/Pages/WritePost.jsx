
import React, { useState, useEffect } from 'react'
import { PostSendPost, PostUplaodImg } from '../api'
import Notiflix from 'notiflix'

const values = {
    title: "",
    description: "",
    author: "",
    comments: [],
    ImgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPhTqAZrRoBnADJbLI-TpKFMdrSLeTnHSYqw&usqp=CAU",
    create: new Date()

}

const WritePost = (e) => {

    const [postData, setpostData] = useState(values)
    const [File, setFile] = useState('')

    const SendPost = async () => {
        if (postData.ImgUrl != 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPhTqAZrRoBnADJbLI-TpKFMdrSLeTnHSYqw&usqp=CAU') {
            if (postData.title != "") {
                if (postData.author != "") {
                    if (postData.description != "") {
                        await PostSendPost(postData)
                        e.history.push("/")


                    } else {
                        Notiflix.Notify.failure("Please Add Description")
                    }
                } else {
                    Notiflix.Notify.failure("Please Add Author")
                }
            } else {
                Notiflix.Notify.failure("Please Add Title")
            }
        } else {
            Notiflix.Notify.failure("Please Upload Image")
        }

    }

    useEffect(async () => {

        const data = new FormData();
        data.append("name", File.name);
        data.append('profile', File);

        const res = await PostUplaodImg(data)
        console.log(res.data)

        setpostData({ ...postData, ImgUrl: res.data.data })
    }, [File])



    return (
        <div className='row m-0 ' style={{ height: "86vh" }}>

            <div class="col-md-7 mt-3 p-2 mx-auto rounded-3 shadow-lg">
                <div class="row  justify-content-around">
                    <div class="col-md-5 border rounded-3 text-center">
                        <img src={postData.ImgUrl} height="200px" width="100%" class="mb-2" />

                        <label class="btn btn-outline-primary mb-2 col-md-5" for="upload-image">upload image</label>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} id="upload-image" style={{ display: "none" }} />

                    </div>

                    <div class="col-md-6">
                        <div class="mb-4">
                            <label for="exampleFormControlInput1" class="form-label"><h3>Title Of Post</h3></label>
                            <input type="email" class="form-control" value={postData.title} id="exampleFormControlInput1" placeholder="Enter Here..."
                                onChange={(e) => setpostData({ ...postData, title: e.target.value })}
                            />
                        </div>

                        <div class="mb-4">
                            <label for="exampleFormControl" class="form-label"><h3>Name Of Author</h3></label>
                            <input type="email" class="form-control" value={postData.author} id="exampleFormControl" placeholder="Enter Here..."
                                onChange={(e) => setpostData({ ...postData, author: e.target.value })}
                            />
                        </div>
                    </div>

                </div>


                <div class="row m-0 mt-4">

                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Desciption of Title</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" value={postData.description}
                            onChange={(e) => setpostData({ ...postData, description: e.target.value })}
                        ></textarea>
                    </div>

                </div>

                <div class="row m-0 px-3 ms-auto">
                    <button class=" col-md-2 btn btn-outline-primary" onClick={SendPost}>Publish</button>
                </div>
            </div>

        </div>
    )
}

export default WritePost
