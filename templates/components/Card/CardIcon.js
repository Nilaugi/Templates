import React from "react";

const CardIcon = ({ icon, title, text }) => {
  return (
    <article className="card-icon">
      <div className="card-icon-head">
        <span className="card-icon-icon">
          {icon}
        </span>
        <h2 className="card-icon-title">
          {title}
        </h2>
      </div>
      <p className="card-icon-text">{text}</p>
    </article>
  );
};

export default CardIcon;
