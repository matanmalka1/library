import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, clearError } from '../store/slices/authSlice'
import LoginForm from '../components/auth/LoginForm'
import Card from '../components/common/Card'
import './Auth.css'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    return () => {
      dispatch(clearError())
    }
  }, [dispatch])

  const handleSubmit = (formData) => {
    dispatch(loginUser(formData))
  }

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
  )
}

export default Login
