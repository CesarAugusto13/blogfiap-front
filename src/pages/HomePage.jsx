import api from '../services/api';
import { useEffect, useState } from 'react';
import Post from '../components/Post';

function HomePage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) {
        return <div>Carregando posts...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Home Page</h1>
            {posts.length > 0 ? (
                posts.map(post => (
                    <Post key={post.id} post={post} />
                ))
            ) : (
                <p>Nenhum post encontrado.</p>
            )}
        </div>
    );
}

export default HomePage;