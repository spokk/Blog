import React from 'react';
import { Link } from 'react-router-dom';

export default function PostItem(props) {
  const { text, avatar, likes, comments, header, name, _id } = props.post;
  const defaultAvatar = 'https://bizraise.pro/wp-content/uploads/2014/09/no-avatar-300x300.png';
  return (
    <Link to={`/post/${_id}`} className="post">
      <div className="post__wrapper">
        <div className="post__avatar-wrapper">
          <img className="post__avatar" src={avatar.length ? avatar : defaultAvatar} alt="avatar" />
          <p className="post__name">{name}</p>
        </div>
        <div className="post__info">
          <h2 className="post__header">{header}</h2>
          <p className="post__text">{text}</p>
          <div className="post__stats">
            <span className="post__stats-item">
              {likes.length}
              <i className="far fa-thumbs-up" />
            </span>
            <span className="post__stats-item">
              {comments.length}
              <i className="far fa-comments" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
