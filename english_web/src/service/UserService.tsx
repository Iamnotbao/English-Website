import axios from "axios";
import type { User } from "../model/User";

const API = import.meta.env.VITE_API_URL;



export const GetListByUser = async (user_id: string, token : string) => {
    
    try {
        const respone = await axios.get(`${API}/user/list/${user_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return respone.data ? respone.data : [];
    } catch (error) {
        console.log(error);
    }
}
export const GetProfileUser = async (user_id: string, token : string) => {
    try {
        const respone = await axios.get(`${API}/user/${user_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return respone.data ? respone.data : {};
    } catch (error) {
        console.log(error);
    }
}

export const EditUser = async (user_id: string, user: Partial<User>| FormData,token :string) => {
    try {
        const respone = await axios.put(`${API}/user/${user_id}`,user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }, )
        return respone.data ? respone.data : {};
    } catch (error) {
        console.log(error);
    }
}

export const DeleteLessonByUser = async (user_id: string,lesson_id:string, token : string) => {
    try {
        const respone = await axios.delete(`${API}/user/${user_id}/${lesson_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return respone.data ? respone.data : {};
    } catch (error) {
        console.log(error);
    }
}