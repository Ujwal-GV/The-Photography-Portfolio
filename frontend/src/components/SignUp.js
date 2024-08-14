import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
}
from 'mdb-react-ui-kit';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleMobile = async(e) => {
        const inputValue = e.target.value;
        if(/^\d*$/.test(inputValue)){
            setPhone(inputValue);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const res = await axios.post('http://localhost:8000/api/user/signup', { name, email, password, phone });
        if (res.status === 201 || 200) {
            navigate('/');
        }
        } catch (error) {
            if (error.response) {
                if (error.response.status ===  400) {
                    setError('User already exists');
                    navigate('/signup');
                } else if (error.response.status === 401) {
                    setError('Failed to create new user');
                    navigate('/');
                } else if (error.response.status === 500) {
                    setError('Server error, please try again later');
                } else {
                    setError('An unknown error occurred');
                }
            } else if (error.request) {
                setError('No response from the server');
            } else {
                setError('Error in setting up request');
            }
            console.error('Error logging in', error);
        }
    };

return(
    <MDBContainer className="my-4 w-75" style={{
        background: "rgba(255, 255, 255, 0.2)",
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(2px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
    }}>
        <form onSubmit={handleSubmit}>
        <MDBCard style={{border: "transparent"}}>
            <MDBRow className='g-0'>

            <MDBCol md='6'>
                <MDBCardImage src='/homeImage.png' alt="login form" className='rounded-start w-75 mx-5 p-5'/>
            </MDBCol>

            <MDBCol md='6'>
                <MDBCardBody className='d-flex flex-column'>

                <div className='d-flex flex-row mt-2'>
                    <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                    <span className="h1 fw-bold mb-0">PHOTOGRAPHY PORTFOLIO</span>
                </div>

                <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign Up</h5>

                    <MDBInput wrapperClass='mb-4' label='UserName' id='formControlLg' type='text' size="lg" value={name} onChange={(e) => setName(e.target.value)} required />
                    <MDBInput wrapperClass='mb-4' label='Email' id='formControlLg' type='email' size="lg" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <MDBInput wrapperClass='mb-4' label='Phone No' id='formControlLg' type='text' maxLength="10" pattern="\d{10}" size="lg" value={phone} onChange={handleMobile} required />

                    {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

                <MDBBtn className="mb-4 px-5" color='dark' size='lg' type='submit'>Register</MDBBtn>
                <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Already Registered? <a href="/" style={{color: '#393f81'}}>Sign In</a></p>

                </MDBCardBody>
            </MDBCol>

            </MDBRow>
        </MDBCard>
        </form>

    </MDBContainer>
    );
}