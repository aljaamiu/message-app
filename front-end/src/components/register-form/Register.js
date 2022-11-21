import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './Register.css';
import {signUp} from '../../routes/UserAction';

function RegisterForm() {
    const { loading, user, error, success } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/message')
        // if (success) navigate('/message')
    }, [navigate, user, success])

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        pass: "",
    });
    
    const { name, email, pass } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (email !== '' && name !== '' && pass !== '') {
            dispatch(signUp({
                name: name,
                email: email,
                password: pass
            }));
        }
        
        clearData();
    };

    const clearData = () => {
        setFormData({ ...formData, name: '', pass: '', email: '',  });
    };

    return (
        <form id="register-form" onSubmit={handleSubmit}>
            <h3>Hello!</h3>
            <div className='form-group row'>
                <input name='name' id='name' value={name} onChange={handleChange} className='input' type='text' placeholder='Name'/>
            </div>
            <div className='form-group row'>
                <input name='email' id='email' value={email} onChange={handleChange} className='input' type='email' placeholder='Email'/>
            </div>
            <div className='form-group row'>
                <input name='pass' id='pass' value={pass} onChange={handleChange} className='input' type='password' placeholder='Password'/>
            </div>
            <div className='form-group row'>
                <button onClick={(e) => e.preventDefault(navigate('/login')) } className='btn' type='button'> Sign In</button>
            </div>
            <div className='form-group row'>
                <button className='signup' type='submit'>Sign Up</button>
            </div>
        </form>
    );
}

export default RegisterForm;