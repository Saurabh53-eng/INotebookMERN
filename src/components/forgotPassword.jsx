// import React from 'react'

// const forgotPassword = (props) => {
//     props.showAlert("Reset Password ", "danger");
//     return (
//         <div className="container form">
//             <p className="text-center"><i>Reset Password 😊 </i></p>
//             <div className="mb-4 input-container">
//                 <label htmlFor="password" className="form-label">New Password</label>
//                 <input type="password" className="form-control" onChange={onchange} id="email" name="email" placeholder="name@example.com" autoComplete='on' />
//             </div>

//             <div className="mb-4 input-container">
//                 <label htmlFor="password" className="form-label">Password</label>
//                 <i className={`fa fa-eye${credentials.showPassword ? "-slash" : ""} view-password`} onClick={handleViewPassword}></i>
//                 <input type={credentials.showPassword ? 'text' : 'password'} className="form-control" onChange={onchange} id="password" name="password" autoComplete='on' />
//                 {errors.password && <span className='error'><i className="fa fa-info-circle"></i> {errors.password}</span>}
//             </div>
//         </div>
//     )
// }

// export default forgotPassword