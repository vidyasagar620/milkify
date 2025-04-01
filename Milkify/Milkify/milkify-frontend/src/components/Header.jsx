import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1>Milkify</h1>
      <p>Simplify Dairy Management</p>
      <div className="profile-icon">
        <i className="icon-user"></i>
      </div>
    </header>
  );
};

export default Header;
