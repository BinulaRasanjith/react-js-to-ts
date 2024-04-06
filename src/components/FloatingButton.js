import { useNavigate } from "react-router-dom";

const FloatingButton = () => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    navigate("/create-post");
  };

  return (
    <button onClick={handleClick} className="floating-btn">
      +
    </button>
  );
};

export default FloatingButton;
