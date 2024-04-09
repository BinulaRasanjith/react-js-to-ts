interface ButtonProps {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  type: "create-btn" | "change-btn" | "destructive-btn";
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type }) => {
  return (
    <button onClick={onClick} className={`btn ${type}`}>
      {label}
    </button>
  );
};

export default Button;
