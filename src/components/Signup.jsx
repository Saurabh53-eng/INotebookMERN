import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar';

function SignUp(props) {
    <Navbar />
    const [credentials, setCredentials] = useState({ email: "", name: "", password: "", cpassword: "", showPassword: false, showConfirmPassword: false });
    const [isLoading, setIsLoading] = useState(false);
    let history = useNavigate();

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleViewPassword = (e) => {
        if (e.target.id === "password") {
            setCredentials({
                ...credentials,
                showPassword: !credentials.showPassword,
            });
        } else {
            setCredentials({
                ...credentials,
                showConfirmPassword: !credentials.showConfirmPassword,
            });
        }
    }
    const handleClick = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await fetch("http://localhost:8080/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, name: credentials.name, password: credentials.password, cpassword: credentials.cpassword })
        });
        const json = await response.json();
        if (credentials.password !== credentials.cpassword) {
            props.showAlert("Password did not match ", "danger");
            setIsLoading(false);
        } else if (json.success) {
            setIsLoading(false);
            localStorage.setItem('token', json.authtoken)
            history("/")
            props.showAlert("Account created successfully", "success")
        } else {
            setIsLoading(false);
            props.showAlert("Invalid Credentials", "danger");
        }

    }

    return (
        <>
            <div className='text-center mb-3'>
                <h1>INotebook</h1>
                <p>Please wait some time for SignUp process</p>
                <p><b>Your notes on cloud ☁️</b></p>
                {isLoading ? <h3>Please wait ....</h3> : null}
            </div>
            <form>
                <div className="container form">
                    <p className="text-center my-3"><i>New to INotebook? 👉🏻Create a new account here! </i></p>
                    <div className="mb-4 input-container">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" onChange={onchange} id="email" name="email" placeholder="name@example.com" autoComplete='on' required />
                    </div>
                    <div className="mb-4 input-container">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" onChange={onchange} id="name" name="name" autoComplete='on' required />
                    </div>
                    <div className="mb-4 input-container">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type={credentials.showPassword ? 'text' : 'password'} className="form-control" onChange={onchange} id="password" name="password" autoComplete='on' required />
                        <i className={`fa fa-eye${credentials.showPassword ? "-slash" : ""} view-password`} id="password" onClick={handleViewPassword}></i>
                    </div>
                    <div className="mb-4 input-container">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <i className={`fa fa-eye${credentials.showConfirmPassword ? "-slash" : ""} view-password`} id="confirm-password" onClick={handleViewPassword}></i>
                        <input type={credentials.showConfirmPassword ? 'text' : 'password'} className="form-control" onChange={onchange} id="cpassword" name="cpassword" autoComplete='on' required />
                    </div>
                </div>
            </form>


            <div className='text-center'>
                <button type="submit" className='btn btn-primary' onClick={handleClick}>SignUp</button>
            </div>
            <br />
            <p className='text-center last-para'>Already have an account? <Link to="/login">Login</Link> </p>

        </>
    )
}

export default SignUp