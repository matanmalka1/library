import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAuthors,
  addAuthor,
  modifyAuthor,
  removeAuthor,
} from '../store/slices/authorsSlice'
import { useAuth } from '../hooks/useAuth'
import AuthorList from '../components/authors/AuthorList'
import AuthorForm from '../components/authors/AuthorForm'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import Loading from '../components/common/Loading'

const Authors = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useAuth()
  const { items: authors, loading, error } = useSelector((state) => state.authors)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState(null)

  useEffect(() => {
    dispatch(fetchAuthors())
  }, [dispatch])

  const handleCreate = async (authorData) => {
    await dispatch(addAuthor(authorData))
    setIsModalOpen(false)
  }

  const handleUpdate = async (id, authorData) => {
    await dispatch(modifyAuthor({ id, authorData }))
    setEditingAuthor(null)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      await dispatch(removeAuthor(id))
    }
  }

  if (loading && !authors.length) return <Loading />
  if (error) return <div className="error-alert">{error}</div>

  return (
    <div className="books-page">
      <div className="page-header">
        <h1>Authors</h1>
        {isAuthenticated && (
          <Button onClick={() => setIsModalOpen(true)}>Add Author</Button>
        )}
      </div>

      <AuthorList
        authors={authors}
        onEdit={setEditingAuthor}
        onDelete={handleDelete}
        canEdit={isAuthenticated}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Author">
        <AuthorForm onSubmit={handleCreate} onCancel={() => setIsModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={!!editingAuthor}
        onClose={() => setEditingAuthor(null)}
        title="Edit Author"
      >
        <AuthorForm
          author={editingAuthor}
          onSubmit={(data) => handleUpdate(editingAuthor.AuthorID, data)}
          onCancel={() => setEditingAuthor(null)}
        />
      </Modal>
    </div>
  )
}

export default Authors
