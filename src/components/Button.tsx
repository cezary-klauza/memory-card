import { ReactNode } from "react"

type ButtonProps = {
    children: ReactNode,
    onClick: () => void
}

const Button = ({children, onClick}: ButtonProps) => {
  return (
    <button onClick={onClick} className="button">
        {children}
    </button>
  )
}

export default Button