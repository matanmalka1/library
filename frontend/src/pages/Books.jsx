import { useState } from "react";
import { useApi } from "../hooks/useApi";
import { getAllBooks, createBook, updateBook, deleteBook } from "../api/books";
import { useAuth } from "../hooks/useAuth";
import BookList from "../components/books/BookList";
import BookForm from "../components/books/BookForm";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import Loading from "../components/common/Loading";
import "./Books.css";

const Books = () => {
  const { isAuthenticated } = useAuth();
  const { data: books, loading, error, execute, setData } = useApi(getAllBooks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const handleCreate = async (bookData) => {
    const newBook = await createBook(bookData);
    setData([...books, newBook]);
    setIsModalOpen(false);
  };

  const handleUpdate = async (id, bookData) => {
    await updateBook(id, bookData);
    await execute();
    setEditingBook(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await deleteBook(id);
      setData(books.filter((b) => b.bookID !== id));
    }
  };

  const openEditModal = (book) => {
    setEditingBook(book);
  };

  if (loading) return <Loading />;
  if (error) return <div className="error-alert">{error}</div>;

  return (
    <div className="books-page">
      <div className="page-header">
        <h1>Books</h1>
        {isAuthenticated && (
          <Button onClick={() => setIsModalOpen(true)}>Add Book</Button>
        )}
      </div>

      <BookList
        books={books}
        onEdit={openEditModal}
        onDelete={handleDelete}
        canEdit={isAuthenticated}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Book"
      >
        <BookForm
          onSubmit={handleCreate}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingBook}
        onClose={() => setEditingBook(null)}
        title="Edit Book"
      >
        <BookForm
          book={editingBook}
          onSubmit={(data) => handleUpdate(editingBook.bookID, data)}
          onCancel={() => setEditingBook(null)}
        />
      </Modal>
    </div>
  );
};

export default Books;
