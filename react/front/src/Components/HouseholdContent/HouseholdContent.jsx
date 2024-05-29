import React, { useEffect, useContext, useState } from 'react';
import { Button } from '../Button/Button';
import './HouseholdContent.css';
import { HouseholdContext } from '../../HouseholdContext';
import { useNavigate } from 'react-router-dom';

export const Content = () => {
    const [activeTab, setActiveTab] = useState('setings');
    const { households } = useContext(HouseholdContext);
    const [user, setUser] = useState(null);
    const token = localStorage.getItem('jwtToken');
    const navigate = useNavigate();

    // Lista de utilizatori de exemplu
    const exampleUsers = [
        { id: 1, username: 'User1', role: 'Father', imgSrc: 'img/profile/user1.png' },
        { id: 2, username: 'User2', role: 'Mother', imgSrc: 'img/profile/user1.png' },
        { id: 3, username: 'User3', role: 'Son', imgSrc: 'img/profile/user1.png' },
        { id: 4, username: 'User4', role: 'Son', imgSrc: 'img/profile/user1.png' },
        { id: 5, username: 'User5', role: 'Daughter', imgSrc: 'img/profile/user1.png' },
        { id: 6, username: 'User6', role: 'Daughter', imgSrc: 'img/profile/user1.png' },
        { id: 7, username: 'User7', role: 'Daughter', imgSrc: 'img/profile/user1.png' }
    ];

    useEffect(() => {
        fetch("http://localhost:9091/account-security", {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setUser(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        if (token != null) {
            console.log('User logged out successfully');
            localStorage.removeItem('jwtToken');
            navigate('/signin');
        }
    }

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleDeleteUser = (userId) => {
        console.log(`Delete user with ID: ${userId}`);
        // Aici poți adăuga logica pentru ștergerea utilizatorului
    };

    const handleManageRole = (userId) => {
        console.log(`Manage role for user with ID: ${userId}`);
        // Aici poți adăuga logica pentru gestionarea rolului utilizatorului
    };

    return (
        <main>
            <div className="bg-img"></div>
            <div className="profile">
                <div className="content-info">
                    <img className='account-img' src="img/account/account.jpg" alt="account-img" />
                    <p id='name'>{user?.username}</p>
                    <p id='role'>{user?.role}</p>
                    <a href="/#/signin" onClick={handleLogout}><Button text={"Log out"} /></a>
                </div>
                <div className="content-2">
                    <div className="chose">
                        <h4 onClick={() => handleTabClick('setings')}>Account Setings</h4>
                        <h4 onClick={() => handleTabClick('security')}>Household</h4>
                    </div>
                    <hr />
                    {activeTab === 'setings' && (
                        <div className="setings">
                            <p>Settings content has been removed.</p>
                        </div>
                    )}
                    {activeTab === 'security' && (
                        <div className="security">
                            <div className="user-list">
                            <h2>Lista utilizatorilor :</h2>
                                {exampleUsers.map((user) => (
                                    <div key={user.id} className="user-item">
                                        <img className='user-img' src={user.imgSrc} alt={`${user.username}-img`} />
                                        <p className='user-name'>{user.username}</p>
                                        <p className='user-role'>{user.role}</p>
                                        <div className="user-actions">
                                            <Button text={"Delete"} onClick={() => handleDeleteUser(user.id)} />
                                            <Button text={"Manage Role"} onClick={() => handleManageRole(user.id)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
