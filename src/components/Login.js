import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login(props) {

    const [credentials, setCredentials] = useState({ email: "", password: "", showPassword: false });
    const [errors, setErrors] = useState({});
   
    const [isLoading, setIsLoading] = useState(false);
    let history = useNavigate();

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
    }

    const handleViewPassword = () => {
        setCredentials({
            ...credentials,
            showPassword: !credentials.showPassword,
        });
    }

    const handleClick = async () => {
    setIsLoading(true);
        const response = await fetch("https://inotebookbackend-5wps.onrender.com/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
      
        const json = await response.json();
        if (json.success) {
                setIsLoading(false);
            localStorage.setItem('token', json.authtoken)
           
            history("/")
            props.showAlert("Logged in successfully", "success")
        } else {
                setIsLoading(false);
        
            props.showAlert("invalid credentials", "danger")
        }
    }

    return (
        <div>
            <div className='text-center mt-5 mb-4'>
        {isLoading ? <h3>trying connect to server please wait...</h3> : null}
                <h1>INotebook</h1>
                <p><b>Your notes on cloud ☁️</b></p>
               
            </div>

            <div className="container form">
                <p className="text-center"><i>Login to continue using INotebook 😊 </i></p>
                <div className="mb-4 input-container">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onchange} id="email" name="email" placeholder="name@example.com" autoComplete='on' />
                    {errors.email && <span className='error'><i className="fa fa-info-circle"></i> {errors.email}</span>}
                </div>

                <div className="mb-4 input-container">
                    <label htmlFor="password" className="form-label">Password</label>
                    <i className={`fa fa-eye${credentials.showPassword ? "-slash" : ""} view-password`} onClick={handleViewPassword}></i>
                    <input type={credentials.showPassword ? 'text' : 'password'} className="form-control" onChange={onchange} id="password" name="password" autoComplete='on' />
                    {errors.password && <span className='error'><i className="fa fa-info-circle"></i> {errors.password}</span>}
                </div>
            </div>
            <div className='text-center'>
                <button className='btn btn-primary' onClick={handleClick}>Login</button>

            </div>
            {/* <p className='text-center'><Link to="/signup">Forgot Password</Link> </p> */}
            <br />

            <p className='text-center last-para'>Don't have an account? <Link to="/Signup">SignUp-&gt;</Link> </p>
        </div>
    )
}

export default Login;
