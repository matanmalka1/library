import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import Loading from './Loading/Loading.jsx'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <Loading fullScreen />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
