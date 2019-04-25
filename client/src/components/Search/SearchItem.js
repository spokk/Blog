import React from 'react';
import { Link } from 'react-router-dom';

export default function SearchItem(props) {
  const { text, avatar, likes, comments, date, header, name, _id } = props.post;
  const defaultAvatar = 'https://bizraise.pro/wp-content/uploads/2014/09/no-avatar-300x300.png';
  return (
    <div style={{ border: '1px solid red', margin: '10px 0' }}>
      <img src={avatar.length ? avatar : defaultAvatar} width="50" alt="avatar" />
      <h2>{header}</h2>
      <p>Name: {name}</p>
      <p>Text: {text}</p>
      <p>Likes: {likes.length}</p>
      <p>Comments: {comments.length}</p>
      <p>Date: {date}</p>
      <Link to={`/post/${_id}`}>link</Link>
    </div>
  );
}
