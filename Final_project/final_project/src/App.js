  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
  import LoginPage from './components/LoginPage';
  import UserListPage from './components/UserListPage';
  import UserProfilePage from './components/UserProfilePage';

  const App = () => {
    const [token, setToken] = useState(localStorage.getItem('UserData'));

    useEffect(() => {
      const loginWithToken = async () => {
        if (token) {
          try {
            const response = await axios.post('https://reqres.in/api/login', { token });
            if (response.data.token) {
              localStorage.setItem('UserData', response.data.token);
              setToken(response.data.token);
            } else {
              localStorage.removeItem('UserData');
              setToken(null);
            }
          } catch (error) {
            console.error('Ошибка при запросе входа:', error);
          }
        }
      };
      loginWithToken();
    }, [token]);

    const fetchUserList = async () => {
      try {
        const response = await axios.get('https://reqres.in/api/users?page=2');
        return response.data.data; // Возвращаем список пользователей
      } catch (error) {
        console.error('Ошибка при запросе списка пользователей:', error);
        return [];
      }
    };

    const fetchUserData = async (userId) => {
      try {
        const response = await axios.get(`https://reqres.in/api/users/${userId}`);
        return response.data.data; // Возвращаем данные пользователя
      } catch (error) {
        console.error('Ошибка при запросе данных пользователя:', error);
        return null;
      }
    };

    const updateProfile = async (userId, newData) => {
      try {
        const response = await axios.put(`https://reqres.in/api/users/${userId}`, newData);
        return response.data; // Возвращаем обновленные данные профиля
      } catch (error) {
        console.error('Ошибка при обновлении профиля:', error);
        return null;
      }
    };

    return (
      <Router>
        <Routes>
          <Route path="/" element={token ? <UserListPage fetchUserList={fetchUserList} /> : <LoginPage setToken={setToken} />} />
          <Route path="/users/:userId" element={<UserProfilePage fetchUserData={fetchUserData} updateProfile={updateProfile} />} />
        </Routes>
      </Router>
    );
  };

  export default App;
