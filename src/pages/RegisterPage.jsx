import React, { useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../styles/RegisterPage.css';

const Register = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (senha !== confirmaSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    if (!nome.trim() || !email.trim() || !senha.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      await api.post('/professores/register', { nome, email, senha });
      setSuccess('Cadastro realizado com sucesso! Você já pode fazer login.');
      setNome('');
      setEmail('');
      setSenha('');
      setConfirmaSenha('');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <div className="register-container">
      <Sidebar />
      <div className="register-form-wrapper">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Cadastro de Professor</h2>

          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome completo"
            required
            className="input-field"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="input-field"
          />

          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            required
            className="input-field"
          />

          <input
            type="password"
            value={confirmaSenha}
            onChange={(e) => setConfirmaSenha(e.target.value)}
            placeholder="Confirme a senha"
            required
            className="input-field"
          />

          <button type="submit" className="submit-button">Registrar</button>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <p style={{ marginTop: '20px', fontSize: '14px', color: '#555' }}>
            Já tem uma conta?{' '}
            <Link to="/login" style={{ color: '#273c75', fontWeight: '600' }}>
              Faça login aqui
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
