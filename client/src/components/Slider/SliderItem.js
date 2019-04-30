import React from 'react';
import { Link } from 'react-router-dom';

export default function SliderItem({ post }) {
  const { header, _id } = post;
  return (
    <div className="slide">
      <p className="slide__header">{header}</p>
      <Link className="slide__link" to={`/post/${_id}`}>
        View Post
      </Link>
    </div>
  );
}
