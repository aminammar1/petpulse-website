"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineMail } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import styles from "../Styles/Login.module.css";

export default function A_page() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reclamations, setReclamations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:4000/Admin_page');
        setUsers(response.data.users);
        setLoading(false);
        toast.success('Data loaded successfully');
      } catch (error) {
        setLoading(false);
        setError(error);
        toast.error('Failed to load data');
        console.error('Failed to load data:', error);
      }
    };

    fetchData();
  }, []);

  const handleUserClick = async (user) => {
    setSelectedUser(user);
    try {
      const reclamationData = await Get_R(user.email);
      setSelectedUser({ ...user, reclamations: reclamationData });
    } catch (error) {
      console.error('Failed to fetch reclamation data:', error);
      toast.error('Failed to fetch reclamation data');
    }
  };

  const handleDeleteAccount = async (email) => {
    try {
      await axios.delete(`http://localhost:4000/user/${encodeURIComponent(email)}`);
      setUsers(users.filter(user => user.email !== email));
      toast.success('User account deleted successfully');
    } catch (error) {
      console.error('Error deleting user account:', error);
      toast.error('Failed to delete user account');
    }
  };

  const Get_R = async (email) => {
    try {
      const response = await axios.get('http://localhost:4000/Get_R', { params: { email } });
      return response.data.reclamations;
    } catch (error) {
      throw new Error('Failed to fetch reclamation data');
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <h1>User List</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <>
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                <div className={styles.userBlock}>
                  <AiOutlineMail onClick={() => handleUserClick(user)} />
                  <span>{user.email}</span>
                  <div className={styles.buttonGroup}>
                    <RiDeleteBinLine onClick={() => handleDeleteAccount(user.email)} className={styles.deleteButton} />
                  </div>
                </div>
                {user.reclamations && (
                  <ul>
                    {user.reclamations.map((reclamation, index) => (
                      <li key={index}>
                        <p>{reclamation.message}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          {selectedUser && (
            <div className={styles.modal}>
              <h2>User Information</h2>
              <p><strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
              <h3>Reclamations:</h3>
              {selectedUser.reclamations && selectedUser.reclamations.length > 0 ? (
                <ul>
                  {selectedUser.reclamations.map((reclamation, index) => (
                    <li key={index}>
                      <p>{reclamation.message}</p>
                      <p>Timestamp: {reclamation.timestamp}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No reclamations found for this user.</p>
              )}
              <button onClick={() => setSelectedUser(null)}>Close</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
