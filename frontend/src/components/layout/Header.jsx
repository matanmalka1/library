import Navbar from "./Navbar";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <h1 className="brand-title">📚 Library</h1>
          <p className="brand-subtitle">Management System</p>
        </div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
