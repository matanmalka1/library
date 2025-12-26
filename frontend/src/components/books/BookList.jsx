import BookCard from "./BookCard/BookCard.jsx";

const BookList = ({ books, onEdit, onDelete, canEdit }) => {
  if (!books || books.length === 0) {
    return <p className="text-center text-muted">No books found.</p>;
  }

  return (
    <div className="grid grid-3">
      {books.map((book) => (
        <BookCard
          key={book.bookID}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
          canEdit={canEdit}
        />
      ))}
    </div>
  );
};

export default BookList;
