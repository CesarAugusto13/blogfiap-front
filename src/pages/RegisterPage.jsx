import React, { useState } from 'react';
import api from '../services/api'; // sua instância axios

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
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Cadastro de Professor</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Nome completo:</label><br />
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Senha:</label><br />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Confirme a senha:</label><br />
          <input
            type="password"
            value={confirmaSenha}
            onChange={(e) => setConfirmaSenha(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px' }}>Registrar</button>
      </form>

      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
      {success && <p style={{ color: 'green', marginTop: 10 }}>{success}</p>}
    </div>
  );
};

export default Register;
