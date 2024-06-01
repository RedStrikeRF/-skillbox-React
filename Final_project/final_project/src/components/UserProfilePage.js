import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    avatar: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`https://reqres.in/api/users/${userId}`);
      const userData = response.data.data;
      setUser(userData);
      setFormData({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        avatar: userData.avatar
      });
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://reqres.in/api/users/${userId}`, formData);
      setUser(response.data);
      setEditing(false);
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
    }
  };

  if (!user) return <div>Загрузка...</div>;

  return (
    <div className="container-fluid bg-light vh-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-6 col-lg-4 bg-white p-4 rounded shadow">
          <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>Назад</button>
          {editing ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Имя:</label>
                <input type="text" className="form-control" name="first_name" value={formData.first_name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Фамилия:</label>
                <input type="text" className="form-control" name="last_name" value={formData.last_name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Аватар:</label>
                <input type="text" className="form-control" name="avatar" value={formData.avatar} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary mt-3">Сохранить</button>
            </form>
          ) : (
            <div className="text-center">
              <img src={user.avatar} alt={user.first_name} className="rounded-circle mb-3" width="100" height="100" />
              <h3>{user.first_name} {user.last_name}</h3>
              <p>{user.email}</p>
              <button className="btn btn-primary mt-3" onClick={() => setEditing(true)}>Редактировать</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
