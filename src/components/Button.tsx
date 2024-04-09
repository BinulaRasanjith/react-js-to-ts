interface ButtonProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  colorTheme: "create-btn" | "change-btn" | "destructive-btn";
  type?: "submit" | "reset" | "button";
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  colorTheme,
  type,
}) => {
  return (
    <button type={type} onClick={onClick} className={`btn ${colorTheme}`}>
      {label}
    </button>
  );
};

export default Button;
