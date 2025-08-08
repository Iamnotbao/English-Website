import axios from "axios";

const API = import.meta.env.VITE_API_URL;



export const GetListByUser = async (user_id: string, token : string) => {
    
    try {
        console.log("chill", token);
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



export const EditUser = async (user_id: string,token :string, user: Object) => {
    try {
        const respone = await axios.put(`${API}/user/${user_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }, user)
        return respone.data ? respone.data : {};
    } catch (error) {
        console.log(error);
    }
}
