import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {signIn} from '../../routes/UserAction';

import './Login.css';

function LoginForm() {

    const { loading, user, error, success } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/message')
        // if (success) navigate('/message')
    }, [navigate, user, success])


    const [formData, setFormData] = useState({
        email: "",
        pass: "",
    });
    
    const { email, pass } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (email !== '' && pass !== '') {
            dispatch(signIn({
                email: email,
                password: pass
            }));
        }
        
        clearData();
    };

    const clearData = () => {
        setFormData({ ...formData, pass: '', email: '',  });
    };

    return (
        <form id="login-form" onSubmit={handleSubmit}>
            <h3>Welcome Back!</h3>
            <div className='form-group row'>
                <input name='email' id='email' value={email} onChange={handleChange} className='input' type='text' placeholder='Email'/>
            </div>
            <div className='form-group row'>
                <input name='pass' id='pass' value={pass} onChange={handleChange} className='input' type='password' placeholder='Password'/>
            </div>
            <div className='form-group row'>
                <button className='btn' type='submit'>Log In</button>
            </div>
            <div className='form-group row'>
                <button onClick={(e) => e.preventDefault(navigate('/register'))} className='signin' type='button'>Sign Up</button>
            </div>
        </form>
    );
}

export default LoginForm;