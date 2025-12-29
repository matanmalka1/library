import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomers } from '../store/slices/customersSlice.js'
import CustomerList from '../components/customers/CustomerList.jsx'
import DataLoader from '../components/common/DataLoader/DataLoader.jsx'

const Customers = () => {
  const dispatch = useDispatch()
  const { items: customers, loading, error } = useSelector((state) => state.customers)

  useEffect(() => {
    dispatch(fetchCustomers())
  }, [dispatch])

  return (
    <div className="books-page">
      <div className="page-header">
        <h1>Customers</h1>
      </div>
      <DataLoader loading={loading} error={error} data={customers} emptyMessage="No customers found.">
        <CustomerList customers={customers} />
      </DataLoader>
    </div>
  )
}

export default Customers
