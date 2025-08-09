import axios from "axios";
import type { LessonData } from "../model/LessonData";

const API = import.meta.env.VITE_API_URL;

export const GetAllLesson = async () => {
  
  try {
    const respone = await axios.get(`${API}/lesson/`)
    return respone.data ? respone.data : [];
  } catch (error) {
    console.log(error);
  }
}
export const GetSingleLesson = async (id:string, token:string) => {
  try {
    const respone = await axios.get(`${API}/lesson/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return respone.data ? respone.data : [];
  } catch (error) {
    console.log(error);
  }
}
export const CreateLesson = async (user_id: string, lesson: LessonData, token: string) => {
  try {
    console.log("lesson", lesson);
    
    const respone = await axios.post(`${API}/lesson/user/${user_id}`,lesson, {
      headers: {
        Authorization: `Bearer ${token}`
      },

    })
    return respone.data ? respone.data : [];
  } catch (error) {
    console.log(error);
  }
}

export const EditLesson = async (user_id:string ,id: string, token :string) => {
  try {
    const respone = await axios.put(`${API}/lesson/${user_id}/${id}`,{
      header:{
        Authorization:`Bearer ${token}`
      }
    })
    return respone.data ? respone.data : [];
  } catch (error) {
    console.log(error);
  }
}

export const DeleteLesson = async (id: string) => {
  try {
    const respone = await axios.delete(`${API}/lesson/user/${id}`)
    return respone.data ? respone.data : [];
  } catch (error) {
    console.log(error);
  }
}