import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
    const { id } = useParams(); // Obtém o ID do post da URL
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/posts/${id}`);
                setPost(response.data);
            } catch (err) {
                console.error("Falha ao buscar o post:", err);
                setError("Não foi possível carregar o post. Tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]); // O ID é uma dependência da useEffect

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
        </div>
    );
};

export default PostDetail;
