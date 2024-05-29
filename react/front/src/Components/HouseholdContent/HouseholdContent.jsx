import React, { useEffect, useContext, useState } from 'react';
import { Button } from '../Button/Button';
import './HouseholdContent.css';
import { HouseholdContext } from '../../HouseholdContext';
import { redirect, useNavigate } from 'react-router-dom';
import { ManageButton } from '../ManageButton/ManageButton';

export const Content = () => {
    const [activeTab, setActiveTab] = useState('setings');
    const { households } = useContext(HouseholdContext);
    const [user, setUser] = useState(null);
    const token = localStorage.getItem('jwtToken');
    const navigate = useNavigate();
    const [role, setRole] = useState({});
    const [showAddMember, setShowAddMember] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showInvitations, setShowInvitations] = useState(false);
    const [newMemberEmail, setNewMemberEmail] = useState('');

    const exampleUsers = [
        { id: 1, username: 'User1', role: 'Father', imgSrc: 'img/profile/user1.png' },
        { id: 2, username: 'User2', role: 'Mother', imgSrc: 'img/profile/user1.png' },
        { id: 3, username: 'User3', role: 'Son', imgSrc: 'img/profile/user1.png' },
        { id: 4, username: 'User4', role: 'Son', imgSrc: 'img/profile/user1.png' },
        { id: 5, username: 'User5', role: 'Daughter', imgSrc: 'img/profile/user1.png' },
        { id: 6, username: 'User6', role: 'Daughter', imgSrc: 'img/profile/user1.png' },
        { id: 7, username: 'User7', role: 'Daughter', imgSrc: 'img/profile/user1.png' }
    ];

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
    };

    const handleManageRole = (userId, newRole) => {
        setRole(prevRole => ({ ...prevRole, [userId]: newRole }));
    };

    const handleAddMemberClick = () => {
        console.log('Add member clicked');
        setShowAddMember(!showAddMember);
    };

    const handleDeleteHouseholdClick = () => {
        setShowDeleteConfirmation(!showDeleteConfirmation);
    };

    const handleViewInvitationsClick = () => {
        setShowInvitations(!showInvitations);
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
                            <div className="top-buttons">
                                <button className="add-member-btn" onClick={handleAddMemberClick}>Add New Member</button>
                                {showAddMember && (
                                    <div className="add-member">
                                        <input type="text" placeholder="Enter name"
                                            style={{ width: '100px', height: '30px',fontSize: '1vw'  }} />
                                        <button style={{ width: '50px', height: '30px',fontSize: '10px', paddingTop:'5px', paddingLeft:'7px'}}>
                                            Send Invitation
                                        </button>
                                    </div>
                                )}
                                <button className="add-member-btn" onClick={handleDeleteHouseholdClick}>Delete Household</button>
                                {showDeleteConfirmation && (
                                    <div className="delete-confirmation">
                                        <p style={{fontSize:'10px'}}>Are you sure you want to delete?</p>
                                        <button style={{ width: '73px', height: '30px' }}>
                                            Yes
                                        </button>
                                        <button style={{ width: '73px', height: '30px' }}>
                                            No
                                        </button>
                                    </div>
                                )}
                                <button className="add-member-btn" onClick={handleViewInvitationsClick}>View Invitations</button>
                                {showInvitations && (
                                    <div className="show-invitations">
                                        
                                        <p style={{fontSize:'15px'}}>Invitation 1</p>
                                        <button style={{ width: '150px', height: '30px' }}>
                                            Accept
                                        </button>
                                        <button style={{ width: '150px', height: '30px' }}>
                                            Decline
                                        </button>

                                        <p style={{fontSize:'15px'}}>Invitation 2</p>
                                        <button style={{ width: '150px', height: '30px' }}>
                                            Accept
                                        </button>
                                        <button style={{ width: '150px', height: '30px' }}>
                                            Decline
                                        </button>

                                    </div>
                                )}
                            </div>

                            <div className="user-list">
                                <h2>Lista utilizatorilor:</h2>
                                {exampleUsers.map((user) => (
                                    <div key={user.id} className="user-item">
                                        <img className='user-img' src={user.imgSrc} alt={`${user.username}-img`} />
                                        <p className='user-name'>{user.username}</p>
                                        <p className='user-role'>{user.role}</p>
                                        <div className="user-actions">
                                            <button style={{backgroundColor:"red"}}className="delete-button" text={"Delete"} onClick={() => handleDeleteUser(user.id)} >Kick</button>
                                            {/* <button className="manage-button" text={"Manage Role"} onClick={() => handleManageRole(user.id)} >Manage</button> */}
                                            <select value={role[user.id] || ''} onChange={(e) => handleManageRole(user.id, e.target.value)}>
                                                <option value="">Manage...</option>
                                                <option value="parent">Parent</option>
                                                <option value="child">Child</option>
                                            </select>
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

export default Content;
