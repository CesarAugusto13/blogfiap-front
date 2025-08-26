import api from '../services/api';
import { useEffect, useState } from 'react';
import Post from '../components/PostItem';
import '../styles/HomePage.css';

function HomePage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/posts');
                setPosts(response.data);
            } catch (err) {
                console.error("Falha ao buscar posts:", err);
                setError("Não foi possível carregar os posts. Tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const filteredPosts = posts.filter(post =>
        post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.conteudo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="loading">Carregando posts...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

   return (
        <div className="homepage">
            <h1 className="title">Home Page</h1>
            <input
                type="text"
                className="search-bar"
                placeholder="Buscar posts..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                    <Post key={post.id} post={post} />
                ))
            ) : (
                <p className="no-posts">Nenhum post encontrado.</p>
            )}
        </div>
    );
}

export default HomePage;
