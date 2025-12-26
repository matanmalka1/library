import AuthorCard from "./AuthorCard.jsx";

const AuthorList = ({ authors, onEdit, onDelete, canEdit }) => {
  if (!authors || authors.length === 0) {
    return <p className="text-center text-muted">No authors found.</p>;
  }

  return (
    <div className="grid grid-3">
      {authors.map((author) => (
        <AuthorCard
          key={author.AuthorID}
          author={author}
          onEdit={onEdit}
          onDelete={onDelete}
          canEdit={canEdit}
        />
      ))}
    </div>
  );
};

export default AuthorList;
