import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Event<span>Feedback</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/admin">Admin Dashboard</Link>
      </div>
    </nav>
  );
}

export default Navbar;
