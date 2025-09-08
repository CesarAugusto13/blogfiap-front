import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';


const AdminPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formAuthor, setFormAuthor] = useState(''); // será preenchido do token
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

  return (
    <div style={{ maxWidth: 800, margin: '20px auto', padding: 20 }}>
      <h1>Administração de Posts</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 40 }}>
        <h2>{editingPostId ? 'Editar Post' : 'Novo Post'}</h2>
        <div style={{ marginBottom: 10 }}>
          <label>
            Título:<br />
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              style={{ width: '100%', padding: 8 }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>
            Autor:<br />
            <input
              type="text"
              value={formAuthor}
              readOnly
              style={{ width: '100%', padding: 8, backgroundColor: '#eee' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>
            Conteúdo:<br />
            <textarea
              value={formContent}
              onChange={(e) => setFormContent(e.target.value)}
              rows={6}
              style={{ width: '100%', padding: 8 }}
              required
            />
          </label>
        </div>
        <button type="submit" style={{ marginRight: 10 }}>
          {editingPostId ? 'Atualizar' : 'Criar'}
        </button>
        {editingPostId && (
          <button type="button" onClick={resetForm}>
            Cancelar
          </button>
        )}
      </form>

      <h2>Posts existentes</h2>
      {loading && <p>Carregando posts...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && posts.length === 0 && <p>Nenhum post encontrado.</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((post) => (
          <li
            key={post._id || post.id}
            style={{
              border: '1px solid #ccc',
              padding: 15,
              marginBottom: 10,
              borderRadius: 4,
            }}
          >
            <h3>{post.titulo}</h3>
            <p>{post.conteudo}</p>
            <p><strong>Autor:</strong> {post.autor}</p>
            <button onClick={() => handleEdit(post)} style={{ marginRight: 10 }}>
              Editar
            </button>
            <button onClick={() => handleDelete(post._id || post.id)} style={{ color: 'red' }}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;