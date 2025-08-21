import React, { useState } from 'react';

function Post({ post }) {
    const [likes, setLikes] = useState(post.likes || 0);


    if (!post) {
        return <p>Post não encontrado.</p>;
    }

    return (
        <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h2>{post.titulo}</h2>
            <p>{post.conteudo}</p>
            <p>{post.autor}</p>
            <p>{post.createdAt} e <span>{post.updatedAt}</span></p>
            <small>ID do Post: {post._id}</small>
        </div>
    );
}

export default Post;