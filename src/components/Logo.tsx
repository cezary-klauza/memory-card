import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <div className="logo">
        <h1>Memory Card</h1>
        <div className="card-wrapper" aria-hidden>
          <div className="card red" aria-hidden />
          <div className="border">
            <div className="card green" aria-hidden />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
