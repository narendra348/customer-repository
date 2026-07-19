import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Customer Registry</h2>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        
      </div>
    </nav>
  );
}

export default Navbar;