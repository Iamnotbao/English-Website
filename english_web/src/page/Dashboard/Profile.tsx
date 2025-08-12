import { useEffect, useState } from "react";
import { EditUser, GetProfileUser } from "../../service/UserService";
import { Box } from "@mui/material";
import type { User } from "../../model/User";
import Introduction from "../../components/Profile/Introduction";
import Contact from "../../components/Profile/Contact";
import EnglishLevel from "../../components/Profile/EnglishLevel";
import Skills from "../../components/Profile/Skills";
import Cerifications from "../../components/Profile/Certifications";
import Achievements from "../../components/Profile/Achievements";
import Gallery from "../../components/Profile/Gallery";


const Profile = () => {
  const [student, setStudent] = useState<Partial<User>>({
    skills: [],
    badges: [],
    certifications: [],
    gallery: [],
  });
  const user = localStorage.getItem("user");
  if (user) {
    try {
      const userObj = JSON.parse(user);
      useEffect(() => {
        const fetchUser = async () => {
          const response = await GetProfileUser(userObj._id, userObj.access_token);
          if (response) {
            console.log("list: ", response);
            setStudent(response.user);
          }
        }
        fetchUser();
      }, [])
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("user has not been stored !");
  }
  const [editField, setEditField] = useState<keyof User | null>(null);
  const [tempValue, setTempValue] = useState("");

  const startEditing = (field: keyof User, value: string | undefined) => {
    setEditField(field);
    setTempValue(value || "");
  };
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      if (user) {
        const userObj = JSON.parse(user);
        await EditUser(userObj._id, formData, userObj.access_token); 
        const response = await GetProfileUser(userObj._id, userObj.access_token);
        if (response) {
          setStudent(response.user);
        }
      }
    } catch (error) {
      console.error("Failed to update avatar", error);
    }
  };
  const saveChange = async (changes?: Partial<User>) => {
    if (changes) {
      setStudent((prev) => ({ ...prev, ...changes }));
    }
    setEditField(null);
    try {
      if (user) {
        const userObj = JSON.parse(user);
        await EditUser(userObj._id, changes || {}, userObj.access_token);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const cancelChange = () => {
    setEditField(null);
  };

  const onChange = (changes: Partial<User>) => {
    setStudent((prev) => ({ ...prev, ...changes }));
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      <Introduction student={student}
        editField={editField}
        tempValue={tempValue}
        setTempValue={setTempValue}
        startEditing={startEditing}
        saveChange={saveChange}
        cancelChange={cancelChange}
        handleFileChange={handleFileChange} 
         />
      <Contact student={student}
        editField={editField}
        tempValue={tempValue}
        setTempValue={setTempValue}
        startEditing={startEditing}
        saveChange={saveChange}
        cancelChange={cancelChange} />
      <EnglishLevel
        student={student}
        editField={editField}
        tempValue={tempValue}
        setTempValue={setTempValue}
        startEditing={startEditing}
        saveChange={saveChange}
        cancelChange={cancelChange} />
      <Skills student={student} onChange={onChange} />
      <Cerifications student={student} onChange={onChange} saveChange={saveChange} />
      <Achievements student={student} />
      <Gallery student={student} onChange={onChange} />
    </Box>
  );
}
export default Profile;