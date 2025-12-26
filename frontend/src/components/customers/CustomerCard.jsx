import Card from "../common/Card/Card.jsx";
import { getInitials } from "../../utils/helpers.js";
import "../authors/AuthorCard.css";

const CustomerCard = ({ customer }) => {
  return (
    <Card className="author-card">
      <div className="author-avatar">
        {getInitials(customer.firstName, customer.lastName)}
      </div>
      <div className="author-info">
        <h3 className="author-name">
          {customer.firstName} {customer.lastName}
        </h3>
        <p className="author-email">{customer.email}</p>
        {customer.address && (
          <p className="text-muted" style={{ fontSize: "0.875rem" }}>
            {customer.address}
          </p>
        )}
        {customer.age && (
          <p className="text-muted" style={{ fontSize: "0.875rem" }}>
            Age: {customer.age}
          </p>
        )}
      </div>
    </Card>
  );
};

export default CustomerCard;
