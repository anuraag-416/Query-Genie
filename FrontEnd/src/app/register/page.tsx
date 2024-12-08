"use client"; // Ensures the component is a client component

import { useState } from "react";
import { useRouter } from "next/navigation"; // Use this for the app directory
// or use import { useRouter } from "next/router"; for the pages directory
import styles from  "../css/login.module.css";
import styles1 from "../css/register.module.css";
import Link from "next/link";
import { registerUser } from '../../common/api/apiUser'; 

const Register = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
  });
  
  const [responseMessage, setResponseMessage] = useState('');
  const router = useRouter(); // Initialize useRouter

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await registerUser(formData); // Call the centralized API
      setResponseMessage('User successfully registered!');
      console.log('User Registered:', response);
      
      // Redirect to the dashboard after successful registration
      router.push('/dashboard'); // Redirect after registration

    } catch (error: any) {
      setResponseMessage(error.message || 'Error occurred during registration');
    }
  };

  return (
    <div className={styles1["reg-container"]}>
      <header className={styles1["main-header"]}>
        <h1 className={styles1["site-name"]}>
          <Link href="/" className={styles1["register-link"]}>
            ragChat
          </Link>
        </h1>
      </header>
      <div className={styles1["register-container"]}>
        <h1 className={styles1["register-title"]}>Register</h1>
        <form className={styles1["register-form"]} onSubmit={handleSubmit}>
          <div className={styles1["form-group"]}>
            {/* <label htmlFor="user_name">User Name</label> */}
            <label className={styles1.label} htmlFor="user_name">User Name</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              required
              className={styles1["form-input"]}
            />
          </div>

          <div className={styles1["form-group"]}>
            {/* <label htmlFor="email">Email</label> */}
            <label className={styles1.label} htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles1["form-input"]}
            />
          </div>

          <div className={styles1["form-group"]}>
            {/* <label htmlFor="password">Password</label> */}
            <label className={styles1.label} htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles1["form-input"]}
            />
          </div>

          <button type="submit" className={styles1["submit-btn"]}>
            Register
          </button>
        </form>
      </div>
      {responseMessage && <p className={styles.message}>{responseMessage}</p>}
    </div>
  );
};

export default Register;
