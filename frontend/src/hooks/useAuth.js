import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/slices/authSlice'

export const useAuth = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, loading } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
  }

  return {
    isAuthenticated,
    isLoading: loading,
    logout: handleLogout,
  }
}
