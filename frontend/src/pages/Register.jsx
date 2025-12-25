import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/auth";
import RegisterForm from "../src/components/auth/RegisterForm";
import Card from "../src/components/common/Card";
import { handleApiError } from "../utils/helpers";
import "./Auth.css";

const Register = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError("");
      await register(formData);
      navigate("/login");
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Card className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Register to get started</p>
        {error && <div className="error-alert">{error}</div>}
        <RegisterForm onSubmit={handleSubmit} loading={loading} />
        <p className="auth-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;
