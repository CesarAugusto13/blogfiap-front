import React from 'react';
import { Link } from 'react-router-dom'; // Importando o Link
import '../styles/PostItem.css';
import heartIcon from '../assets/heart.icon.svg';

const PostItem = ({ post }) => {
  return (
    <div className="post">
      <h4 hidden>{post._id}</h4>
      <Link to={`/post/${post._id}`} className="post-link">
        <h2 className="post-title">{post.titulo}</h2>
        <h4 className="post-author">{post.autor}</h4>
        <p className="post-content">{post.conteudo}</p>
      </Link>
      <div className="likes-display">
        <img src={heartIcon} alt="Likes" className="likes-icon" />
        <span className="likes-text">{post.curtidas}</span>
      </div>
    </div>
  );
};

export default PostItem;
