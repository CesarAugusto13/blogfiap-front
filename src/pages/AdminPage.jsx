import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../styles/AdminPage.css';

const AdminPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formAuthor, setFormAuthor] = useState('');
  const [editingPostId, setEditingPostId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setFormAuthor(decoded.nome);
      } catch (err) {
        console.error('Erro ao decodificar token:', err);
      }
    }
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (err) {
      setError('Erro ao carregar posts.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormTitle('');
    setFormContent('');
    setEditingPostId(null);
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setFormAuthor(decoded.nome);
      } catch {}
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formTitle.trim() || !formContent.trim()) {
      alert('Título e conteúdo são obrigatórios.');
      return;
    }

    try {
      if (editingPostId) {
        await api.put(`/posts/${editingPostId}`, {
          titulo: formTitle,
          conteudo: formContent,
        });
        alert('Post atualizado com sucesso!');
      } else {
        await api.post('/posts', {
          titulo: formTitle,
          conteudo: formContent,
          autor: formAuthor,
        });
        alert('Post criado com sucesso!');
      }
      resetForm();
      fetchPosts();
    } catch (err) {
      alert('Erro ao salvar post. Tente novamente.');
    }
  };

  const handleEdit = (post) => {
    setFormTitle(post.titulo);
    setFormContent(post.conteudo);
    setEditingPostId(post._id || post.id);
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Tem certeza que deseja excluir este post?')) return;

    try {
      await api.delete(`/posts/${postId}`);
      alert('Post excluído com sucesso!');
      fetchPosts();
    } catch (err) {
      alert('Erro ao excluir post. Tente novamente.');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPosts = posts.filter(post =>
    post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.conteudo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-container">
      <h1>Administração de Posts</h1>
      <Sidebar />
      <form onSubmit={handleSubmit} className="admin-form">
        <h2>{editingPostId ? 'Editar Post' : 'Novo Post'}</h2>
        <label>
          Título:
          <input
            type="text"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Autor:
          <input
            type="text"
            value={formAuthor}
            readOnly
          />
        </label>
        <label>
          Conteúdo:
          <textarea
            value={formContent}
            onChange={(e) => setFormContent(e.target.value)}
            rows={6}
            required
          />
        </label>
        <button type="submit">
          {editingPostId ? 'Atualizar' : 'Criar'}
        </button>
        {editingPostId && (
          <button type="button" onClick={resetForm}>
            Cancelar
          </button>
        )}
      </form>

      <h2>Posts existentes</h2>
      <input
        type="text"
        placeholder="Buscar posts..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="admin-search"
      />
      {loading && <p>Carregando posts...</p>}
      {error && <p className="admin-error">{error}</p>}

      <ul className="admin-post-list">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <li
              key={post._id || post.id}
              className="admin-post-item"
              onClick={() => navigate(`/post/${post._id || post.id}`)}
            >
              <h3>{post.titulo}</h3>
              <p>{post.conteudo}</p>
              <p><strong>Autor:</strong> {post.autor}</p>
              <div className="admin-post-buttons">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(post);
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(post._id || post.id);
                  }}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>Nenhum post encontrado.</p>
        )}
      </ul>
    </div>
  );
};

export default AdminPage;