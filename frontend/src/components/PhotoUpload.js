import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function PhotoUpload() {
    const [photographerName, setPhotographerName] = useState('');
    const [title, setTitle] = useState('');
    const [mobile, setMobile] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [cookie, setCookie] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const name = Cookies.get('name');
        if(name){
          setCookie(name);
        } else {
          navigate('/');
        }
      }, [navigate]);

    const handleMobile = async(e) => {
        const inputValue = e.target.value;
        if(/^\d*$/.test(inputValue)){
            setMobile(inputValue);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('photographerName', photographerName);
        formData.append('mobile', mobile);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:8000/api/photography/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log("Created", response.data);
            navigate('/main');
        } catch (error) {
            if (error.request) {
                console.error('No response from the server');
            } else {
                console.error('Error in setting up request');
            }
            console.error('Error creating employee', error);
        }
    };

    return (
        <>
            {cookie && 
            <div className="background-wrapper ml-5 mr-5">
            <h2 className='text-center fs-1 m-1 p-1'>Post a Photograph</h2>
            <form onSubmit={submitHandler} className="background-content m-5">
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={photographerName}
                        onChange={(e) => setPhotographerName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Title:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Mobile:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={mobile}
                        onChange={handleMobile}
                        maxLength='10'
                        pattern='\d{10}'
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Image:</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary m-2">POST</button>
                <a href="/main"><button type="button" className="btn btn-primary m-2">BACK</button></a>
            </form>
        </div>
        }
        </>
    );
}
