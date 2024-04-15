interface ButtonProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "reset" | "button";
  colorTheme?: "create-btn" | "change-btn" | "destructive-btn";
}
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type,
  colorTheme,
}) => {
  return (
    <button onClick={onClick} type={type} className={`btn ${colorTheme}`}>
      {label}
    </button>
  );
};

export default Button;
