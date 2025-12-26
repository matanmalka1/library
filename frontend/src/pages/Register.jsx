import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, clearError } from '../store/slices/authSlice.js'
import RegisterForm from '../components/auth/RegisterForm.jsx'
import Card from '../components/common/Card/Card.jsx'
import './Auth/Auth.css'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  useEffect(() => {
    return () => {
      dispatch(clearError())
    }
  }, [dispatch])

  const handleSubmit = async (formData) => {
    const result = await dispatch(registerUser(formData))
    if (!result.error) {
      navigate('/login')
    }
  }

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
  )
}

export default Register
