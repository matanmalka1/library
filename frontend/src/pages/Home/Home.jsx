import { Link } from "react-router-dom";
import Button from "../../components/common/Button/Button.jsx";
import Card from "../../components/common/Card/Card.jsx";
import "./Home.css";

const Home = () => {
  const features = [
    {
      title: "📚 Browse Books",
      description: "Explore our collection of books with detailed information",
      link: "/books",
    },
    {
      title: "✍️ Discover Authors",
      description: "Learn about the authors behind your favorite books",
      link: "/authors",
    },
    {
      title: "👥 Manage Customers",
      description: "View and manage customer accounts (requires login)",
      link: "/customers",
    },
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <h1 className="hero-title">Welcome to Library Management System</h1>
        <p className="hero-subtitle">
          Your comprehensive solution for managing books, authors, and customers
        </p>
        <div className="hero-actions">
          <Link to="/books">
            <Button size="large">Browse Books</Button>
          </Link>
          <Link to="/register">
            <Button variant="outline" size="large">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">Features</h2>
        <div className="grid grid-3">
          {features.map((feature, index) => (
            <Card key={index}>
              <h3>{feature.title}</h3>
              <p className="text-muted">{feature.description}</p>
              <Link to={feature.link}>
                <Button variant="outline" size="small" fullWidth>
                  Explore →
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="stats">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Books Available</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Registered Authors</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Access Anytime</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
