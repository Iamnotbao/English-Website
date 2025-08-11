import axios from "axios";
import type { QuestionData } from "../model/QuestionData";

const API = import.meta.env.VITE_API_URL;


export const GetAllPost = async (token : string) => {
    
    try {
        const respone = await axios.get(`${API}/post/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return respone.data ? respone.data : [];
    } catch (error) {
        console.log(error);
    }
}
export const GetPostById = async (id: string, token : string) => {
    try {
        const respone = await axios.get(`${API}/post/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return respone.data ? respone.data : {};
    } catch (error) {
        console.log(error);
    }
}
export const CreatePost = async (post: QuestionData,token : string) => {
    try {
        const respone = await axios.post(`${API}/post/`,post, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return respone.data ? respone.data : {};
    } catch (error) {
        console.log(error);
    }
}

export const ToggleLike = async(post_id: string, user_id: string, token :string)=>{
    try {
        console.log(token);
        
        const respone = await axios.post(`${API}/post/${post_id}/like/${user_id}`,{},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return respone.data ? respone.data : {};
    } catch (error) {
        console.log(error);
    }
}


