import CustomerCard from "./CustomerCard";

const CustomerList = ({ customers }) => {
  if (!customers || customers.length === 0) {
    return <p className="text-center text-muted">No customers found.</p>;
  }

  return (
    <div className="grid grid-3">
      {customers.map((customer) => (
        <CustomerCard key={customer.customerID} customer={customer} />
      ))}
    </div>
  );
};

export default CustomerList;
