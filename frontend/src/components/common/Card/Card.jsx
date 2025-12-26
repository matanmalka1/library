import "./Card.css";

const Card = ({ children, className = "", onClick }) => {
  const classes = `card ${onClick ? "card-clickable" : ""} ${className}`;

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
