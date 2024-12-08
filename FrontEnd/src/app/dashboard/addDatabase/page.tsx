"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { addDbConfig } from '../../../common/api/apiDbConfig'; 
import styles from '../../css/addDatabase.module.css';



const AddDbConfig = () => {
    const [formData, setFormData] = useState({
        name: "",            
        db_host: "",        
        db_username: "",     
        db_password: "",    
        dialect: "",       
        db_context: "",     
        status: "active",    
        config: null         
    });

    const [responseMessage, setResponseMessage] = useState('');
    const router = useRouter();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await addDbConfig(formData);
            setResponseMessage('Database configuration successfully added!');
            console.log('DB Config Added:', response);
            
            router.push('/dashboard'); 

        } catch (error: any) {
            setResponseMessage(error.message || 'Error occurred during submission');
        }
    };

    return (
        <div className={styles["reg-container"]}>
            <nav className={styles["navbar"]}>
                <div className={styles["navbar-content"]}>
                    <h1 className={styles["navbar-title"]}><Link href="/dashboard" className={styles["dashboard-link"]}>RAGChat</Link> </h1>
                    <ul className={styles["navbar-links"]}>
                        <li><Link href="/dashboard">Home</Link></li>
                        {/* <li><Link href="/profile">Profile</Link></li> */}
                        <li><Link href="/">Logout</Link></li>
                    </ul>
                </div>
            </nav>

            <div className={styles["register-container"]}>
                <h1 className={styles["register-title"]}>Add Database Configuration</h1>
                <form className={styles["register-form"]} onSubmit={handleSubmit}>
                    <div className={styles["form-group"]}>
                        <label htmlFor="name">Database Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your database name"
                            className={styles["form-input"]}
                        />
                    </div>

                    <div className={styles["form-group"]}>
                        <label htmlFor="db_host">Host</label>
                        <input
                            type="text"
                            id="db_host"
                            name="db_host"
                            value={formData.db_host}
                            onChange={handleChange}
                            required
                            placeholder="Sample host id is 127.0.0.1.3300"
                            className={styles["form-input"]}
                        />
                    </div>

                    <div className={styles["form-group"]}>
                        <label htmlFor="db_username">User</label>
                        <input
                            type="text"
                            id="db_username"
                            name="db_username"
                            value={formData.db_username}
                            onChange={handleChange}
                            required
                            placeholder="Enter user name"
                            className={styles["form-input"]}
                        />
                    </div>

                    <div className={styles["form-group"]}>
                        <label htmlFor="db_password">Password</label>
                        <input
                            type="password"
                            id="db_password"
                            name="db_password"
                            value={formData.db_password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your database password"
                            className={styles["form-input"]}
                        />
                    </div>

                    <div className={styles["form-group"]}>
                        <label htmlFor="dialect">Dialect</label>
                        <select
                            id="dialect"
                            name="dialect"
                            value={formData.dialect}
                            onChange={handleChange}
                            required
                            className={styles["form-input"]}
                        >
                            <option value="">Select a dialect</option>
                            <option value="mysql">MySQL</option>
                            <option value="postgresql">PostgreSQL</option>
                            <option value="mongodb">MongoDB</option>
                        </select>
                    </div>

                    <div className={styles["form-group"]}>
                        <label htmlFor="db_context">Database Context</label>
                        <input
                            type="text"
                            id="db_context"
                            name="db_context"
                            value={formData.db_context}
                            onChange={handleChange}
                            className={styles["form-input"]}
                        />
                    </div>

                    <button type="submit" className={styles["submit-btn"]}>
                        Add Database Config
                    </button>
                </form>
            </div>
            {responseMessage && <p className={styles["response-message"]}>{responseMessage}</p>}
        </div>
    );
};

export default AddDbConfig;
