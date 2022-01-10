
import axios from "axios";


export const PostSendPost = async (data) => {
    try{
        return await axios.post(`/createpost`, data)
    }catch(err) { console.log(err)}
}

export const GetPost = async () => {
    try{
        return await axios.get(`/post`)
    }catch(err) { console.log(err)}
}

export const PostUplaodImg = async (data) => {
    try{
        return await axios.post(`/upload`, data)
    }catch(err) { console.log(err)}
}

export const PostComment = async (data) => {
    try{
        return await axios.post(`/postcomment`, data)
    }catch(err) { console.log(err)}
}