import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userStore } from '../stores/UserStore';
import { observer } from 'mobx-react-lite';

const Dashboard = observer(() => {
  const [user, setUser] = useState(userStore.user);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const token = userStore.token;
    const role = userStore.role;
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      userStore.getUserProfile();
      setUser(userStore.user);
      console.log(userStore.user)
      if (userStore.user.role === 'developer') {
        navigate('/developer');
      } else if (userStore.user.role  === 'senior') {
        navigate('/senior');
      } else if (userStore.user.role  === 'manager') {
        navigate('/manager');
      }
    } catch (error) {
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchUser();
  }, [navigate]);

  return null; 
});

export default Dashboard;
