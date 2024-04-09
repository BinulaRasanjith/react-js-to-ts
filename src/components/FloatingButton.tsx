import { useNavigate } from "react-router-dom";

const FloatingButton = () => {
  const navigate = useNavigate();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    navigate("/create-post");
  };

  return (
    <button onClick={handleClick} className="floating-btn">
      +
    </button>
  );
};

export default FloatingButton;
