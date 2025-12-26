import Card from "../../common/Card/Card.jsx";
import Button from "../../common/Button/Button.jsx";
import { formatDate, truncateText } from "../../../utils/helpers.js";
import "./BookCard.css";

const BookCard = ({ book, onEdit, onDelete, canEdit }) => {
  return (
    <Card className="book-card">
      <div className="book-info">
        <h3 className="book-title">{book.bookName}</h3>
        <p className="book-author">{book.authorName}</p>
        <p className="book-desc">{truncateText(book.desc, 100)}</p>
        <div className="book-meta">
          <span className="book-genre">{book.genre}</span>
          <span className="book-pages">{book.pages} pages</span>
        </div>
        <p className="book-date">{formatDate(book.publishDate)}</p>
      </div>
      {canEdit && (
        <div className="book-actions">
          <Button size="small" onClick={() => onEdit(book)}>
            Edit
          </Button>
          <Button
            size="small"
            variant="danger"
            onClick={() => onDelete(book.bookID)}
          >
            Delete
          </Button>
        </div>
      )}
    </Card>
  );
};

export default BookCard;
