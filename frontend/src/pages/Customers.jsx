import { useApi } from "../hooks/useApi";
import { getAllCustomers } from "../api/customers";
import CustomerList from "../src/components/customers/CustomerList";
import Loading from "../src/components/common/Loading";

const Customers = () => {
  const { data: customers, loading, error } = useApi(getAllCustomers);

  if (loading) return <Loading />;
  if (error) return <div className="error-alert">{error}</div>;

  return (
    <div className="books-page">
      <div className="page-header">
        <h1>Customers</h1>
      </div>
      <CustomerList customers={customers} />
    </div>
  );
};

export default Customers;
