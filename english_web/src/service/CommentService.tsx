import axios from "axios";
import type { CommentData } from "../model/CommentData";

const API = import.meta.env.VITE_API_URL;


export const GetAllComment = async (token : string) => {
    
    try {
        const respone = await axios.get(`${API}/comment/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return respone.data ? respone.data : [];
    } catch (error) {
        console.log(error);
    }
}
export const GetCommentByPost = async (post_id: string, token : string) => {
    try {
        console.log("post",post_id);
        
        const respone = await axios.get(`${API}/comment/${post_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return respone.data ? respone.data : {};
    } catch (error) {
        console.log(error);
    }
}
export const CreateComment = async (post_id: string,user_id:string,comment:CommentData, token : string) => {
    try {
        console.log("post",post_id);
        
        const respones = await axios.post(`${API}/comment/${post_id}/${user_id}`,comment, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return respones.data ? respones.data : {};
    } catch (error) {
        console.log(error);
    }
}


