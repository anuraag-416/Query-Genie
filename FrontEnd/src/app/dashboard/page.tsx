"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
// import "../css/dashboard.css";
import styles from '../css/dashboard.module.css'
import { getDbConfigs } from '../../common/api/apiDbConfig'; // Import the getDbConfigs function

interface DbConfig {
  id:number;
  name: string;
  db_host: string;
  db_username: string;
  db_password: string;
  dialect: string;
  db_context: string;
  config: any;
  status: string;
}

const Dashboard = () => {
  const [databases, setDatabases] = useState<DbConfig[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const router = useRouter(); // Initialize the router from Next.js
  useEffect(() => {
    const fetchDatabases = async () => {
      try {
        const userId = 1; // Replace this with the actual logged-in user's ID
        const fetchedDatabases = await getDbConfigs(userId); // Make the API call
        console.log(fetchDatabases);
        setDatabases(fetchedDatabases); // Update the state with the fetched databases
      } catch (error: any) {
        setErrorMessage(error.message || 'Failed to load databases');
      }
    };

   fetchDatabases();
  }, []);
  const toggleDropdown = (id: number) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleCardClick = (id: number) => {
    // Redirect to /chat with the current database id
    router.push(`/chat?db_id=${id}`);
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles['navbar-content']}>
          <h1 className={styles["navbar-title"]}>RAGChat Dashboard</h1>
          <ul className={styles["navbar-links"]}>
            <li><Link href="/dashboard">Home</Link></li>
            {/* <li><Link href="/profile">Profile</Link></li> */}
            <li><Link href="/">Logout</Link></li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className={styles["main-content"]}>
        {/* Database Section */}

        <div className={styles["database-section"]}>
          <h2 className={styles["section-title"]}>Databases</h2>
          <div className={styles["databases-list"]}>
            {databases.map((db) => (
              <div
                key={db.id}
                className={styles["database-card"]}
                onClick={() => handleCardClick(db.id)} // Handle card click
              >
                <div className={styles["card-header"]}>
                  <h3 className={styles["database-name"]}>{db.name}</h3>
                  {/* Three Dots Menu */}
                  <div className={styles["dropdown-container"]} onClick={(e) => e.stopPropagation()}>
                    <button
                      className={styles["dropdown-btn"]}
                      onClick={() => toggleDropdown(db.id)}
                    >
                      &#x22EE;
                    </button>
                    {activeDropdown === db.id && (
                      <div className={styles["dropdown-menu"]}>
                        <button className={styles["dropdown-item"]}>View</button>
                        <button className={styles["dropdown-item"]}>Edit</button>
                        <button className={styles["dropdown-item"]}>Delete</button>
                      </div>
                    )}
                  </div>
                </div>
                <p className={styles["database-type"]}>Type: {db.dialect}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right top "Add Database" button */}
        <div className={styles["add-database-section"]}>
          <Link href="/dashboard/addDatabase"><button className={styles["add-database-btn"]}>+ Add Database</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
