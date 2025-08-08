import { useEffect } from "react";
import { GetListByUser, GetProfileUser } from "../../service/UserService";

const Profile = () => {
  const user = localStorage.getItem("user");
  if (user) {
    try {
      const userObj = JSON.parse(user);
      useEffect(() => {
        const fetchUser = async () => {
          const response = await GetProfileUser(userObj._id,userObj.access_token);
          if(response){
            console.log("list: ", response);
          }
        }
        fetchUser();
      },[])
    } catch (error) {
      console.error("Lỗi khi parse JSON:", error);
    }
  } else {
    console.log("Không tìm thấy key 'user' trong localStorage");
  }

  return (
    <div className="profile">
      <h1>Profile Page</h1>
      <p>This is your profile section where you can view and edit your personal information.</p>
    </div>
  );
}
export default Profile;