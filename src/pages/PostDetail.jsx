import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import heartIcon from '../assets/heart.icon.svg';
import '../styles/PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data);
        setComments(response.data.comentarios);

        const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
        setLiked(likedPosts.includes(id));
      } catch (err) {
        console.error("Falha ao buscar o post:", err);
        setError("Não foi possível carregar o post. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleLikeClick = async () => {
    if (liked) return;

    try {
      await api.patch(`/posts/${id}/curtir`);

      setPost(prevPost => ({
        ...prevPost,
        curtidas: prevPost.curtidas + 1
      }));

      setLiked(true);

      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
      likedPosts.push(id);
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    } catch (err) {
      console.error("Erro ao curtir o post:", err);
      setError("Não foi possível curtir o post. Tente novamente mais tarde.");
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const response = await api.post(`/posts/${id}/comentarios`, { conteudo: newComment });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (err) {
      setError("Não foi possível adicionar o comentário. Tente novamente mais tarde.");
    }
  };

  if (loading) {
    return <div className="loading">Carregando post...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="post-detail-container">
      <Sidebar />
      <main className="post-detail-content">
        <article className="post-detail-article">
          <h1 className="post-title">{post.titulo}</h1>
          <h4 className="post-author">Por {post.autor}</h4>
          <p className="post-content">{post.conteudo}</p>

          <div
            className={`likes-display ${liked ? 'liked' : ''}`}
            onClick={handleLikeClick}
            title={liked ? "Você já curtiu" : "Clique para curtir"}
            style={{ cursor: liked ? 'default' : 'pointer', userSelect: 'none' }}
          >
            <img src={heartIcon} alt="Likes" className="likes-icon" />
            <span>{post.curtidas}</span>
          </div>

          <section className="comments-section">
            <h3>Comentários</h3>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="comment">
                  <p>{comment.conteudo}</p>
                </div>
              ))
            ) : (
              <p className="no-comments">Nenhum comentário ainda.</p>
            )}
          </section>

          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Escreva um comentário..."
              className="comment-textarea"
              rows={4}
            />
            <button type="submit" className="comment-submit-button">Adicionar Comentário</button>
          </form>

          {error && <p className="error-message">{error}</p>}
        </article>
      </main>
    </div>
  );
};

export default PostDetail;
