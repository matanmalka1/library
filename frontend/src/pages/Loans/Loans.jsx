import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoans,
  addLoan,
  removeLoan,
} from "../../store/slices/loansSlice.js";
import { fetchBooks } from "../../store/slices/booksSlice.js";
import { fetchCustomers } from "../../store/slices/customersSlice.js";
import { useAuth } from "../../hooks/useAuth.js";
import LoanList from "../../components/Loans/LoanList.jsx";
import LoanForm from "../../components/Loans/LoansForm.jsx";
import Button from "../../components/common/Button/Button.jsx";
import Modal from "../../components/common/Modal/Modal.jsx";
import DataLoader from "../../components/common/DataLoader/DataLoader.jsx";
import "../Books/Books.css";

const Loans = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const { items: loans, loading, error } = useSelector((state) => state.loans);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchLoans());
    dispatch(fetchBooks());
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleCreate = async (loanData) => {
    await dispatch(addLoan(loanData));
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to return this book?")) {
      await dispatch(removeLoan(id));
    }
  };

  return (
    <div className="books-page">
      <div className="page-header">
        <h1>Book Loans</h1>
        {isAuthenticated && (
          <Button onClick={() => setIsModalOpen(true)}>Create Loan</Button>
        )}
      </div>

      <DataLoader loading={loading} error={error} data={loans} emptyMessage="No loans found.">
        <LoanList
          loans={loans}
          onDelete={handleDelete}
          canEdit={isAuthenticated}
        />
      </DataLoader>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Loan"
      >
        <LoanForm
          onSubmit={handleCreate}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Loans;
