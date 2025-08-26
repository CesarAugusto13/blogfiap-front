import React from 'react';
import '../styles/PostItem.css';
import heartIcon from '../assets/heart.icon.svg';

const Post = ({ post }) => {
  return (
    <div className="post">
      <h2 className="post-title">{post.titulo}</h2>
      <h4 className="post-author">{post.autor}</h4>
      <p className="post-content">{post.conteudo}</p>
      <div className="likes-display">
        <img src={heartIcon} alt="Likes" className="likes-icon" />
        <span className="likes-text">{post.curtidas}</span>
      </div>
    </div>
  );
};

export default Post;
