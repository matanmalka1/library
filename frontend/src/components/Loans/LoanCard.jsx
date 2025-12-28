import Card from "../common/Card/Card.jsx";
import Button from "../common/Button/Button.jsx";
import { formatDate } from "../../utils/helpers.js";
import "../books/BookCard/BookCard.css";

const LoanCard = ({ loan, onDelete, canEdit }) => {
  return (
    <Card className="book-card">
      <div className="book-info">
        <h3 className="book-title">{loan.Book?.bookName || "Unknown Book"}</h3>
        <p className="book-author">
          Customer: {loan.Customer?.firstName} {loan.Customer?.lastName}
        </p>
        <p className="book-desc">Email: {loan.Customer?.email}</p>
        <p className="book-date">Loaned: {formatDate(loan.createdAt)}</p>
      </div>
      {canEdit && (
        <div className="book-actions">
          <Button
            size="small"
            variant="danger"
            onClick={() => onDelete(loan.LoanID)}
          >
            Return Book
          </Button>
        </div>
      )}
    </Card>
  );
};

export default LoanCard;
