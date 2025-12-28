import LoanCard from "./LoanCard.jsx";

const LoanList = ({ loans, onDelete, canEdit }) => {
  if (!loans || loans.length === 0) {
    return <p className="text-center text-muted">No loans found.</p>;
  }

  return (
    <div className="grid grid-3">
      {loans.map((loan) => (
        <LoanCard
          key={loan.LoanID}
          loan={loan}
          onDelete={onDelete}
          canEdit={canEdit}
        />
      ))}
    </div>
  );
};

export default LoanList;
