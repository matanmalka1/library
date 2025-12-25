import { useState } from "react";
import { useApi } from "../hooks/useApi";
import {
  getAllAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../api/authors";
import { useAuth } from "../hooks/useAuth";
import AuthorList from "../components/authors/AuthorList.jsx";
import AuthorForm from "../components/authors/AuthorForm";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import Loading from "../components/common/Loading";

const Authors = () => {
  const { isAuthenticated } = useAuth();
  const {
    data: authors,
    loading,
    error,
    execute,
    setData,
  } = useApi(getAllAuthors);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(null);

  const handleCreate = async (authorData) => {
    const newAuthor = await createAuthor(authorData);
    setData([...authors, newAuthor]);
    setIsModalOpen(false);
  };

  const handleUpdate = async (id, authorData) => {
    await updateAuthor(id, authorData);
    await execute();
    setEditingAuthor(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this author?")) {
      await deleteAuthor(id);
      setData(authors.filter((a) => a.AuthorID !== id));
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="error-alert">{error}</div>;

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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Author"
      >
        <AuthorForm
          onSubmit={handleCreate}
          onCancel={() => setIsModalOpen(false)}
        />
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
  );
};

export default Authors;
