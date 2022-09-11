import { Button } from '@mui/material';
import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from './features/appSlice';
import { auth, provider } from './Firebase';
import './Login.css';


function Login() {

    const dispatch = useDispatch();

    const signIn = () => {
    
        signInWithPopup(auth, provider)
            .then((result) => {
                dispatch(
                    login({
                        username: result.user.displayName,
                        profilePic: result.user.photoURL,
                        id: result.user.uid,
                    })
                )
            })
            .catch ((error) => alert(error.message))
    };

    return (
        <div className="login">
            <div className="login__container">
                <img
                    src="https://logos-download.com/wp-content/uploads/2016/07/Snapchat_logo.png"
                    alt=""
                />
                <Button variant="outlined" onClick={signIn}>
                    SignIn
                </Button>
            </div>
        </div>
    );
}

export default Login
