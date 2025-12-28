import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Input from "../common/Input/Input.jsx";
import Button from "../common/Button/Button.jsx";

const LoanForm = ({ onSubmit, onCancel }) => {
  const { items: books } = useSelector((state) => state.books);
  const { items: customers } = useSelector((state) => state.customers);

  const [formData, setFormData] = useState({
    bookID: "",
    customerID: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      bookID: parseInt(formData.bookID),
      customerID: parseInt(formData.customerID),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label className="input-label">
          Book <span className="required">*</span>
        </label>
        <select
          name="bookID"
          value={formData.bookID}
          onChange={handleChange}
          className="input"
          required
        >
          <option value="">Select a book</option>
          {books.map((book) => (
            <option key={book.bookID} value={book.bookID}>
              {book.bookName}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group">
        <label className="input-label">
          Customer <span className="required">*</span>
        </label>
        <select
          name="customerID"
          value={formData.customerID}
          onChange={handleChange}
          className="input"
          required
        >
          <option value="">Select a customer</option>
          {customers.map((customer) => (
            <option key={customer.customerID} value={customer.customerID}>
              {customer.firstName} {customer.lastName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 mt-3">
        <Button type="submit" fullWidth>
          Create Loan
        </Button>
        <Button type="button" variant="secondary" fullWidth onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default LoanForm;
