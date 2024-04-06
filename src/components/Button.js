import React from "react";

const Button = ({ label, onClick, type }) => {
  return (
    <button onClick={onClick} className={`btn ${type}`}>
      {label}
    </button>
  );
};

export default Button;
