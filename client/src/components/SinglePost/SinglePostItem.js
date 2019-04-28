import React from 'react';
import { Link } from 'react-router-dom';

export default function SinglePostItem(props) {
  const { text, avatar, date, header, name, postAuthor } = props.post;
  const defaultAvatar = 'https://bizraise.pro/wp-content/uploads/2014/09/no-avatar-300x300.png';
  const time = new Date(date);
  const postDate = (
    <>
      {time.toLocaleString('en-us', { month: 'short' })} {time.getDate()}, {time.getFullYear()}
    </>
  );
  return (
    <>
      <div className="single-post__credentials">
        <img className="single-post__avatar" src={avatar.length ? avatar : defaultAvatar} alt="avatar" />
        <div className="single-post__author">
          <Link to={`/user/${postAuthor}`} className="single-post__name">
            {name}
          </Link>
          <p className="single-post__date">{postDate}</p>
        </div>
      </div>
      <div className="single-post__info">
        <h2 className="single-post__header">{header}</h2>
        <p className="single-post__text">{text}</p>
      </div>
    </>
  );
}
