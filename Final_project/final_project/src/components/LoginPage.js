import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const LoginPage = ({ setToken }) => {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        const response = await axios.post('https://reqres.in/api/login', { email, password });
        setToken(response.data.token);
        localStorage.setItem('UserData', response.data.token);
      } else if (mode === 'register') {
        const response = await axios.post('https://reqres.in/api/register', {
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          avatar
        });
        localStorage.setItem('UserData', response.data.token);
        setToken(response.data.token);
      }
    } catch (error) {
      setError('Ошибка: ' + error.response.data.error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <div>
            <h1>{mode === 'login' ? 'Вход' : 'Регистрация'}</h1>
            {error && <p className="text-danger">{error}</p>}
            <Form onSubmit={handleSubmit}>
              {mode === 'register' && (
                <>
                  <Form.Group controlId="firstName">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                  </Form.Group>
                  <Form.Group controlId="lastName">
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                  </Form.Group>
                  <Form.Group controlId="avatar">
                    <Form.Label>Аватар</Form.Label>
                    <Form.Control type="url" value={avatar} onChange={(e) => setAvatar(e.target.value)} required />
                  </Form.Group>
                </>
              )}
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </Form.Group>
              <Button variant="primary" type="submit">{mode === 'login' ? 'Войти' : 'Зарегистрироваться'}</Button>
            </Form>
            <Button variant="link" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
              {mode === 'login' ? 'Перейти к регистрации' : 'Вернуться к входу'}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
