import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAuthors,
  addAuthor,
  modifyAuthor,
  removeAuthor,
} from "../../store/slices/authorsSlice.js";
import { useAuth } from "../../hooks/useAuth.js";
import AuthorList from "../../components/authors/AuthorList.jsx";
import AuthorForm from "../../components/authors/AuthorForm.jsx";
import Button from "../../components/common/Button/Button.jsx";
import Modal from "../../components/common/Modal/Modal.jsx";
import DataLoader from "../../components/common/DataLoader/DataLoader.jsx";

const Authors = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const {
    items: authors,
    loading,
    error,
  } = useSelector((state) => state.authors);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(null);

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  const handleCreate = async (authorData) => {
    await dispatch(addAuthor(authorData));
    setIsModalOpen(false);
  };

  const handleUpdate = async (id, authorData) => {
    await dispatch(modifyAuthor({ id, authorData }));
    setEditingAuthor(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this author?")) {
      await dispatch(removeAuthor(id));
    }
  };

  return (
    <div className="books-page">
      <div className="page-header">
        <h1>Authors</h1>
        {isAuthenticated && (
          <Button onClick={() => setIsModalOpen(true)}>Add Author</Button>
        )}
      </div>

      <DataLoader
        loading={loading}
        error={error}
        data={authors}
        emptyMessage="No authors found."
      >
        <AuthorList
          authors={authors}
          onEdit={setEditingAuthor}
          onDelete={handleDelete}
          canEdit={isAuthenticated}
        />
      </DataLoader>

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
