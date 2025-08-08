import axios from "axios";

const API = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("access_token");


export const GetAllLesson = async () => {
  
  try {
    
    const respone = await axios.get(`${API}/lesson/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return respone.data ? respone.data : [];
  } catch (error) {
    console.log(error);
  }
}
export const GetSingleLesson = async (id:string) => {
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
export const CreateLesson = async (user_id: string, lesson: Object) => {
  try {
    const respone = await axios.post(`${API}/lesson/user/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      lesson
    })
    return respone.data ? respone.data : [];
  } catch (error) {
    console.log(error);
  }
}

export const EditLesson = async (user_id:string ,id: string) => {
  try {
    const respone = await axios.put(`${API}/lesson/${user_id}/${id}`)
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