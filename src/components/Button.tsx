import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  active: boolean;
};

const Button = ({ children, onClick, active }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`button ${!active && "unactive"}`}>
      {children}
    </button>
  );
};

export default Button;
