import React, { Fragment, useEffect, useState } from 'react'
import styles from "../EmailVerify/Styles.css";
import { Link, useParams } from 'react-router-dom';
import success from "../EmailVerify/emailVerify.png";
const EmailVerify = () => {

    const [validUrl, setvalidUrl] = useState(false)
    const param = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `http://localhost:8080/api/users/${param.id}/verify/${param.token}`

                const emailVerify = async () => {
                    const response = await fetch(`${url}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                    await response.json();
                }
                emailVerify();
                setvalidUrl(true)
            } catch (error) {
                console.log(error);
                setvalidUrl(false)
            }
        }
        verifyEmailUrl()
    }, [param])

    return (
        <div>
            <Fragment>
                {validUrl ? (
                    <div className={styles.container}>
                        <img src={success} alt="success_img" className={styles.success_img} />
                        <h1>Email Verified Successfully</h1>
                        <Link to='/login'>
                            <button className={styles.green_btn}>Login</button>
                        </Link>
                    </div>
                ) : (
                    <h1>404 not found</h1>
                )}
            </Fragment>
        </div>
    )
}

export default EmailVerify