import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('id');
  const [currentPage, setCurrentPage] = useState(localStorage.getItem('currentPage') || 1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=${currentPage}`);
        let filteredUsers = response.data.data.filter(user => {
          const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
          return fullName.includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
        });
        if (sortCriteria === 'id') {
          filteredUsers = filteredUsers.sort((a, b) => a.id - b.id);
        } else if (sortCriteria === 'name') {
          filteredUsers = filteredUsers.sort((a, b) => a.first_name.localeCompare(b.first_name));
        } else if (sortCriteria === 'email') {
          filteredUsers = filteredUsers.sort((a, b) => a.email.localeCompare(b.email));
        }
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
      }
    };
    fetchUsers();
  }, [currentPage, searchTerm, sortCriteria]);

  const handleLogout = () => {
    localStorage.removeItem('UserData');
    localStorage.removeItem('currentPage');
    window.location.reload();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const token = localStorage.getItem('UserData');

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        {token && (
          <button className="btn btn-danger" onClick={handleLogout}>Выйти</button>
        )}
        <div className="form-inline">
          <input type="text" className="form-control mr-2" placeholder="Поиск..." value={searchTerm} onChange={handleSearchChange} />
          <select className="form-control" value={sortCriteria} onChange={handleSortChange}>
            <option value="id">Сортировка по ID</option>
            <option value="name">Сортировка по имени</option>
            <option value="email">Сортировка по почте</option>
          </select>
        </div>
      </div>
      <h1 className="mb-4">Список пользователей</h1>
      <div className="row">
        {users.map((user) => (
          <div className="col-md-4 mb-4" key={user.id}>
            <div className="card">
              <img src={user.avatar} className="card-img-top" alt={user.first_name} />
              <div className="card-body">
                <h5 className="card-title">{user.first_name} {user.last_name}</h5>
                <p className="card-text">{user.email}</p>
                <Link to={`/users/${user.id}`} className="btn btn-primary mr-2">Просмотреть профиль</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between mt-3 align-items-center">
        <button className="btn btn-secondary" onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1}>Предыдущая</button>
        <span className="font-weight-bold">Текущая страница: {currentPage}</span>
        <button className="btn btn-secondary" onClick={() => setCurrentPage(prev => prev + 1)}>Следующая</button>
      </div>
    </div>
  );
};

export default UserListPage;
