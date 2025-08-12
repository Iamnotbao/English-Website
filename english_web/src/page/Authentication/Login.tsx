import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Input, InputLabel, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackGround from "../../assets/image/background.jpg"
import AuthService from '../../service/AuthService';
import { useAuth } from "../../hooks/useAuth";
const Login = () => {
    const [selectedValue, setSelectedValue] = useState(true);
    const navigation = useNavigate();
    const {login} = useAuth();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.checked);
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const user = {
            username: form.usernameOrEmail.value,
            password: form.password.value
        }
        try {
            const response = await AuthService.login({username: user.username, password: user.password});
            if(response) {
                login(response)
                 navigation("/");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    }

    return (
        <div className="login h-screen w-full bg-gray-100 flex flex-col items-center justify-center bg-image-cover bg-no-repeat " style={{ backgroundImage: `url(${BackGround})` }}>
            <div className="login__form flex flex-col items-center justify-center ml-auto mr-auto w-[600px] h-[500px] border-1 border-gray-100 opacity-80 bg-[blue] text-[white]">
                <Typography variant="h3" className="mb-10" align='center' sx={{ mb: 6 }}>
                    Login
                </Typography>
                <form onSubmit={handleSubmit} className="login__content flex flex-col gap-4 w-[500px]">
                    <FormControl sx={{ mb: 2 }}>
                        <InputLabel htmlFor="usernameOrEmail" sx={{color:"white", fontSize:"20px"}}>Username or Email</InputLabel>
                        <Input
                            fullWidth
                            id="usernameOrEmail"
                            name="usernameOrEmail"
                            autoFocus
                            required
                            sx={{color:"white", fontSize:"20px"}}
                        />
                    </FormControl>
                    <FormControl sx={{ mb: 4 }}>
                        <InputLabel htmlFor="password" sx={{color:"white", fontSize:"20px"}}>Password</InputLabel>
                        <Input
                            fullWidth
                            id="password"
                            name="password"
                            required
                            type="password"
                            sx={{ color: "white", fontSize: "20px" }}
                        />

                    </FormControl>
                    <Typography variant="body2" className="text-red-500 mb-4">
                        <Link className="hover:black" to="/forgot-password" ><span className="text-[white] text-[15px]">I forgot my password</span></Link>
                    </Typography>
                    <FormGroup className="flex flex-row gap-4 mb-4">
                        <FormControlLabel
                            control={
                                <Checkbox checked={selectedValue} onChange={handleChange} name="check" />
                            }
                            label="Remember me"
                        />
                    </FormGroup>
                    <Button type="submit" variant="contained" endIcon={<SendIcon />} className='w-[60%] self-center' sx={{ mb: 2,  }}>
                        Sign In
                    </Button>
                    <Typography variant="body2" className="text-red-500 mb-4" align='center' >
                        <Link className="hover:black" to="/register"><span className="text-[white]">Create new account</span></Link>
                    </Typography>
                </form>
            </div>
        </div>

    );
}

export default Login;
