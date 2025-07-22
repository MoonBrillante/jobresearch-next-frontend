'use client';
import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { useRouter } from 'next/navigation';
import JobList from '@/components/JobList';

type User = {
    username: string;
    password: string;
}

function Login() {
    const router = useRouter();

    const [user, setUser] = useState<User>({
        username: '',
        password: ''
    });

    const [isAuthenticated, setAuth] = useState(false);
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');  // Error message

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    const handleLogin = () => {
        if (!user.username || !user.password) {
            setErrorMessage('Username and password are required');
            setOpen(true);
            return;
        }

        axios.post(process.env.NEXT_PUBLIC_API_URL + "/login", user, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true  // Send credentials so cross-origin requests include cookies
        })
            .then(res => {
                const jwtToken = res.headers.authorization || res.data.token;
                console.log("JWT Token:", jwtToken);  // Output the obtained JWT Token

                if (jwtToken) {
                    const cleanedToken = jwtToken.replace(/^Bearer\s/, '');
                    sessionStorage.setItem("jwt", cleanedToken);
                    console.log("Stored JWT Token:", sessionStorage.getItem("jwt"));  // Check if the Token is stored correctly
                    setAuth(true);
                    router.push('/jobs');
                } else {
                    setErrorMessage("No JWT Token found in response.");
                    setOpen(true);
                }
            })
            .catch(err => {
                const errorResponse = err.response;
                console.log("Error Response:", errorResponse);  // Output error information
                console.log("Error Message:", err.message);  // Output error information
                setErrorMessage(`Login failed: ${errorResponse?.data?.message || err.message}`);
                setOpen(true);
            });
    }

    const handleLogout = () => {
        setAuth(false);
        sessionStorage.removeItem("jwt");  // Clearing JWT
    }

    if (isAuthenticated) {
        return <JobList logOut={handleLogout} />;
    }

    return (
        <Stack spacing={2} alignItems="center" mt={2}>
            <TextField
                name="username"
                label="Username"
                onChange={handleChange} />
            <TextField
                type="password"
                name="password"
                label="Password"
                onChange={handleChange} />
            <Button
                variant="outlined"
                color="primary"
                onClick={handleLogin}>
                Login
            </Button>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message={errorMessage}  // Show error information
            />
        </Stack>

    );
}

export default Login;