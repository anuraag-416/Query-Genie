"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Use this for the app directory
import { loginUser } from '../common/api/apiUser'; 
// import styles from "./css/global.module.css";
import styles from "./css/login.module.css"
// import "./css/login.css";
export default function Home() {
  const router = useRouter(); // Initialize useRouter

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [responseMessage, setResponseMessage] = useState('');

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
      const response = await loginUser(formData); 
      
      router.push('/dashboard'); 

    } catch (error: any) {
      setResponseMessage(error.message || 'Error occurred during login');
    }
  };
  return (
    <div className={styles["main-container"]}>
      <div className={`${styles["landing-sub-container"]} ${styles["intro-container"]}`}>

        <section className={styles["intro"]}>
          <h2>Welcome to RAGChat</h2>
          <p>
          RAGChat allows users to effortlessly connect to databases and perform queries using natural language. Experience a streamlined way to unlock insights and manage data without needing any technical expertise.
          </p>
        </section>
      </div>
      <div className={`${styles["landing-sub-container"]} ${styles["login-container"]}`}>

        <div className={styles["login-section"]}>
            <div className={styles["login-container"]}>
              <h1 className={styles["login-title"]}>LOGIN</h1>
              <form className={styles["login-form"]} onSubmit={handleSubmit}>
                <div className={styles["form-group"]}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles["form-input"]}
                  />
                </div>

                <div className={styles["form-group"]}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={styles["form-input"]}
                  />
                </div>

                <button className={`${styles["form-group"]} ${styles.submit} ${styles.btn}`} id="login-btn">
                  Login
                </button>
              </form>
            </div>

          <Link href="/register" className={styles["login-link"]}>
            <button className={`${styles.btn} ${styles.submitBtn}`} id="signup-btn">
              Sign Up
            </button>
          </Link>
          {responseMessage && <p>{responseMessage}</p>}

        </div>
      </div>
    </div>
  );
}
