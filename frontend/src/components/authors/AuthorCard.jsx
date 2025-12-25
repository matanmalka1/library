import Card from "../common/Card";
import Button from "../common/Button";
import { getInitials } from "../../utils/helpers";
import "./AuthorCard.css";

const AuthorCard = ({ author, onEdit, onDelete, canEdit }) => {
  return (
    <Card className="author-card">
      <div className="author-avatar">
        {getInitials(author.firstName, author.lastName)}
      </div>
      <div className="author-info">
        <h3 className="author-name">
          {author.firstName} {author.lastName}
        </h3>
        <p className="author-email">{author.email}</p>
      </div>
      {canEdit && (
        <div className="author-actions">
          <Button size="small" onClick={() => onEdit(author)}>
            Edit
          </Button>
          <Button
            size="small"
            variant="danger"
            onClick={() => onDelete(author.AuthorID)}
          >
            Delete
          </Button>
        </div>
      )}
    </Card>
  );
};

export default AuthorCard;
