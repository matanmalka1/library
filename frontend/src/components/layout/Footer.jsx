import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          © {currentYear} Library Management System. Built with ❤️ by Matan
          Yehuda Malka
        </p>
      </div>
    </footer>
  );
};

export default Footer;
