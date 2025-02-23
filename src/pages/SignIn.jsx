import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const SignIn = () => {
    const dispatch = useDispatch();

    // State variables
    const [loginData, setLoginData] = useState({ name: "", password: "" });
    const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });

    // Handle input changes
    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSignupChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    };

    // Login function
    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await axios.post(
                "https://youtubeclone-server.up.railway.app/api/auth/signin",
                loginData,
                { withCredentials: true }
            );

            localStorage.setItem("access_token", res.data.token);
            dispatch(loginSuccess(res.data));
            window.location.href = "/";
        } catch (err) {
            dispatch(loginFailure());
            console.error("Login Error:", err);
        }
    };

    // Signup function
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                "https://youtubeclone-server.up.railway.app/api/auth/signup",
                signupData,
                { withCredentials: true }
            );
            window.location.reload();
        } catch (err) {
            console.error("Signup Error:", err);
        }
    };

    // Google Sign-in function
    const signInWithGoogle = async () => {
        try {
            dispatch(loginStart());
            const result = await signInWithPopup(auth, provider);
            const res = await axios.post(
                "https://youtubeclone-server.up.railway.app/api/auth/google",
                {
                    name: result.user.displayName,
                    email: result.user.email,
                    img: result.user.photoURL,
                }
            );

            localStorage.setItem("access_token", res.data.token);
            dispatch(loginSuccess(res.data));
            window.location.href = "/";
        } catch (error) {
            dispatch(loginFailure());
        }
    };

    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <SubTitle>To continue to videoTube</SubTitle>

                <Input type="text" name="name" placeholder="Username" onChange={handleLoginChange} />
                <Input type="password" name="password" placeholder="Password" onChange={handleLoginChange} />
                <Button onClick={handleLogin}>SIGN IN</Button>

                <Title>OR</Title>
                <Button onClick={signInWithGoogle}>Sign in with Google</Button>

                <Title>OR</Title>
                <Input type="text" name="name" placeholder="Username" onChange={handleSignupChange} />
                <Input type="email" name="email" placeholder="Email" onChange={handleSignupChange} />
                <Input type="password" name="password" placeholder="Password" onChange={handleSignupChange} />
                <Button onClick={handleSignup}>SIGN UP</Button>
            </Wrapper>

            <More>
                English (USA)
                <Links>
                    <Link>Help</Link>
                    <Link>Privacy</Link>
                    <Link>Terms</Link>
                </Links>
            </More>
        </Container>
    );
};

export default SignIn;

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 56px);
    color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: ${({ theme }) => theme.bgLighter};
    border: 1px solid ${({ theme }) => theme.soft};
    padding: 20px 50px;
    gap: 10px;
    width: 300px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
    font-size: 24px;
    color: ${({ theme }) => theme.text};
`;

const SubTitle = styled.h2`
    font-size: 15px;
    font-weight: 300;
    color: ${({ theme }) => theme.textSoft};
`;

const Input = styled.input`
    border: 1px solid ${({ theme }) => theme.soft};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
    width: 100%;
    color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
    border-radius: 3px;
    border: none;
    padding: 10px 20px;
    background-color: ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.textSoft};
    font-weight: 500;
    cursor: pointer;
    width: 100%;
    &:active {
        transform: scale(0.95);
    }
`;

const More = styled.div`
    display: flex;
    margin-top: 10px;
    font-size: 12px;
    color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
    margin-left: 50px;
    display: flex;
    gap: 20px;
`;

const Link = styled.span`
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;
