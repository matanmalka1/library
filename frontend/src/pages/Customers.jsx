import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomers } from '../store/slices/customersSlice.js'
import CustomerList from '../components/customers/CustomerList.jsx'
import Loading from '../components/common/Loading/Loading.jsx'

const Customers = () => {
  const dispatch = useDispatch()
  const { items: customers, loading, error } = useSelector((state) => state.customers)

  useEffect(() => {
    dispatch(fetchCustomers())
  }, [dispatch])

  if (loading) return <Loading />
  if (error) return <div className="error-alert">{error}</div>

  return (
    <div className="books-page">
      <div className="page-header">
        <h1>Customers</h1>
      </div>
      <CustomerList customers={customers} />
    </div>
  )
}

export default Customers
