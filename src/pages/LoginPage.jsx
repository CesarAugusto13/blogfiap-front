import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../styles/LoginPage.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/professores/login', { email, senha });
      localStorage.setItem('token', response.data.token);
      navigate('/admin');
    } catch {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div className="login-container">
      <Sidebar />
      <div className="login-form-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Entrar no Blog</h2>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="input-field"
          />
          <input
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            placeholder="Senha"
            required
            className="input-field"
          />
          <button type="submit" className="submit-button">Entrar</button>
          {error && <p className="error-message">{error}</p>}

          <p style={{ marginTop: '20px', fontSize: '14px', color: '#555' }}>
            Não tem uma conta?{' '}
            <Link to="/register" style={{ color: '#273c75', fontWeight: '600' }}>
              Cadastre-se aqui
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
