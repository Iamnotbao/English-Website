import { Button, FormControl, FormHelperText, Input, InputLabel, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import BackGround from "../../assets/image/background.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../service/AuthService";

const Register = () => {
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.password.value !== form.confirmPassword.value) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    const user = {
      username: form.username.value,
      email: form.email.value,
      password: form.password.value
    }
    try {
      const response = await AuthService.register({ username: user.username, email: user.email, password: user.password });
      if (response) {
        navigation("/login");
      }
    } catch (error) {
      console.error("Register failed:", error);
    }
  }
  return (
    <div className="register">
      <div className="login h-screen w-full bg-gray-100 flex flex-col items-center justify-center bg-image-cover bg-no-repeat  " style={{ backgroundImage: `url(${BackGround})` }}>
        <div className="login__form flex flex-col items-center justify-center ml-auto mr-auto w-[600px] h-[500px] border-1 opacity-80 bg-[blue] text-[white]">
          <Typography variant="h3" className="mb-10" align='center' sx={{ mb: 6 }}>
            Register
          </Typography>
          <form onSubmit={handleSubmit} className="login__content flex flex-col gap-4 w-[500px]">
            <FormControl sx={{ mb: 2 }}>
              <InputLabel htmlFor="email" sx={{ color: "white", fontSize: "20px" }}>Email</InputLabel>
              <Input
                fullWidth
                id="email"
                name="email"
                type="email"
                required
                autoFocus
                sx={{ color: "white", fontSize: "20px" }}
              />
            </FormControl>

            <FormControl sx={{ mb: 2 }}>
              <InputLabel htmlFor="password" sx={{ color: "white", fontSize: "20px" }}>Password</InputLabel>
              <Input
                fullWidth
                id="password"
                name="password"
                type="password"
                required
                sx={{ color: "white", fontSize: "20px" }}
              />
            </FormControl>

            <FormControl sx={{ mb: 2 }}>
              <InputLabel htmlFor="confirmPassword" sx={{ color: "white", fontSize: "20px" }}>Confirm Password</InputLabel>
              <Input
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                sx={{ color: "white", fontSize: "20px" }}
              />
            </FormControl>

            {/* Show error just once below both fields */}
            {error && (
              <FormHelperText sx={{ color: 'red', fontSize: "15px", mb: 2 }}>
                {error}
              </FormHelperText>
            )}

            <FormControl sx={{ mb: 4 }}>
              <InputLabel htmlFor="username" sx={{ color: "white", fontSize: "20px" }}>Username</InputLabel>
              <Input
                fullWidth
                id="username"
                name="username"
                required
                sx={{ color: "white", fontSize: "20px" }}
              />
            </FormControl>
            <Button type="submit" variant="contained" endIcon={<SendIcon />} className='w-[60%] self-center'>
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
