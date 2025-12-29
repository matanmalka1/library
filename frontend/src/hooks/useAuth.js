import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { logout } from '../store/slices/authSlice.js'

export const useAuth = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, loading } = useSelector((state) => state.auth)

  const handleLogout = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  return {
    isAuthenticated,
    isLoading: loading,
    logout: handleLogout,
  }
}
