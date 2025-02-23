import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const SignIn = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("https://youtubeclone-server.up.railway.app/api/auth/register", {
                name,
                email,
                password,
            });
            dispatch(loginSuccess(res.data));
        } catch (err) {
            dispatch(loginFailure());
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await axios.post(
                "https://youtubeclone-server.up.railway.app/api/auth/signin",
                { name, email, password },
                { withCredentials: true }
            );
            dispatch(loginSuccess(res.data));
        }
        catch (err) {
            dispatch(loginFailure());
        }
    };

    const signInWithGoogle = async () => {
        try {
            dispatch(loginStart());
            const result = await signInWithPopup(auth, provider);
            const res = await axios.post(
                "https://youtubeclone-server.up.railway.app/api/auth/google",
                {
                    name: result.user.displayName,
                    email: result.user.email,
                    img: result.user.photoURL, // Ensure this is correct
                },
            );
            dispatch(loginSuccess(res.data));
        } catch (error) {
            console.error(error);
            dispatch(loginFailure());
        }
    };

    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <SubTitle>To continue to YouTube-clone</SubTitle>
                <Input type="text" placeholder="Username" onChange={(e) => setName(e.target.value)} />
                <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleLogin}>SIGN IN</Button>

                <Title>OR</Title>
                <Button onClick={signInWithGoogle}>Signin with Google</Button>


                <Title>OR</Title>
                <Input placeholder="Username" onChange={(e) => setName(e.target.value)} />
                <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
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
    )
}

export default SignIn

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 56px); /* Fixed the typo here */
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
