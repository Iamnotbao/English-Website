import { Button, FormControl, FormHelperText, Input, InputLabel, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import BackGround from "../assets/image/background.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
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
    console.log("User data:", user);
    setLoading(true);
    navigation("/login");
  }
  return (
    <div className="register">
      <div className="login h-screen w-full bg-gray-100 flex flex-col items-center justify-center bg-image-cover bg-no-repeat " style={{ backgroundImage: `url(${BackGround})` }}>
        <div className="login__form flex flex-col items-center justify-center ml-auto mr-auto w-[600px] h-[500px] border-1">
          <Typography variant="h3" className="mb-10" align='center' sx={{ mb: 6 }}>
            Register
          </Typography>
          <form onSubmit={handleSubmit} className="login__content flex flex-col gap-4 w-[500px]">
            <FormControl sx={{ mb: 2 }}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                fullWidth
                id="email"
                name="email"
                type="email"
                required
                autoFocus
              />
            </FormControl>
            <FormControl sx={{ mb: 4 }}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                fullWidth
                id="password"
                name="password"
                type="password"
                required
              />
              {error && <FormHelperText sx={{ color: 'red', fontSize:"15px"}}>{error}</FormHelperText>}
            </FormControl>
            <FormControl sx={{ mb: 4 }}>
              <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
              <Input
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
              />
             {error && <FormHelperText sx={{ color: 'red', fontSize:"15px"}}>{error}</FormHelperText>}
            </FormControl>
            <FormControl sx={{ mb: 4 }}>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                fullWidth
                id="username"
                name="username"
                autoFocus
                required
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
