import React from "react";

const Button = ({ label, onClick, type, colorTheme }) => {
  return (
    <button onClick={onClick} type={type} className={`btn ${colorTheme}`}>
      {label}
    </button>
  );
};

export default Button;
