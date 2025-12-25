import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth";
import { useAuth } from "../hooks/useAuth";
import LoginForm from "../components/auth/LoginForm";
import Card from "../components/common/Card";
import { handleApiError } from "../utils/helpers";
import "./Auth.css";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError("");
      const data = await login(formData.email, formData.password);
      authLogin(data.token);
      navigate("/");
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Card className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Login to access your account</p>
        {error && <div className="error-alert">{error}</div>}
        <LoginForm onSubmit={handleSubmit} loading={loading} />
        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
