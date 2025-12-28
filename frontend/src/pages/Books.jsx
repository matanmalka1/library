import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchBooks,
  addBook,
  modifyBook,
  removeBook,
} from '../store/slices/booksSlice'
import { useAuth } from '../hooks/useAuth'
import BookList from '../components/books/BookList'
import BookForm from '../components/books/BookForm'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import Loading from '../components/common/Loading'
import './Books.css'

const Books = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useAuth()
  const { items: books, loading, error } = useSelector((state) => state.books)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBook, setEditingBook] = useState(null)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  const handleCreate = async (bookData) => {
    await dispatch(addBook(bookData))
    setIsModalOpen(false)
  }

  const handleUpdate = async (id, bookData) => {
    await dispatch(modifyBook({ id, bookData }))
    setEditingBook(null)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      await dispatch(removeBook(id))
    }
  }

  const openEditModal = (book) => {
    setEditingBook(book)
  }

  if (loading && !books.length) return <Loading />
  if (error) return <div className="error-alert">{error}</div>

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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Book">
        <BookForm onSubmit={handleCreate} onCancel={() => setIsModalOpen(false)} />
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
  )
}

export default Books
