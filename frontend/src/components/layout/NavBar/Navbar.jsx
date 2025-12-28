import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.js";
import Button from "../../common/Button/Button.jsx";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/books"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Books
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/authors"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Authors
          </NavLink>
        </li>
        {isAuthenticated && (
          <>
            <li>
              <NavLink
                to="/customers"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Customers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/loans"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Loans
              </NavLink>
            </li>
          </>
        )}
      </ul>
      <div className="nav-auth">
        {isAuthenticated ? (
          <Button onClick={handleLogout} variant="outline" size="small">
            Logout
          </Button>
        ) : (
          <>
            <NavLink to="/login">
              <Button variant="outline" size="small">
                Login
              </Button>
            </NavLink>
            <NavLink to="/register">
              <Button variant="primary" size="small">
                Register
              </Button>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;