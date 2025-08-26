import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useParams } from 'react-router-dom';
import '../styles/PostDetail.css';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/posts/${id}`);
                setPost(response.data);
                setComments(response.data.comentarios); // Carrega os comentários existentes
            } catch (err) {
                console.error("Falha ao buscar o post:", err);
                setError("Não foi possível carregar o post. Tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment) return; // Não envia se o campo estiver vazio

        try {
            const response = await api.post(`/posts/${id}/comentarios`, { conteudo: newComment });
            setComments([...comments, response.data]); // Adiciona o novo comentário à lista
            setNewComment(''); // Limpa o campo de entrada
        } catch (err) {
            console.error("Erro ao adicionar comentário:", err);
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
        <div className="post-detail">
            <h1>{post.titulo}</h1>
            <h4>{post.autor}</h4>
            <p>{post.conteudo}</p>
            <div className="likes-display">
                <span>Curtidas: {post.curtidas}</span>
            </div>

            <h3>Comentários</h3>
            <div className="comments-section">
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <p>{comment.conteudo}</p>
                        </div>
                    ))
                ) : (
                    <p>Nenhum comentário ainda.</p>
                )}
            </div>

            <form onSubmit={handleCommentSubmit}>
                <textarea
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Escreva um comentário..."
                />
                <button type="submit">Adicionar Comentário</button>
            </form>
        </div>
    );
};

export default PostDetail;
