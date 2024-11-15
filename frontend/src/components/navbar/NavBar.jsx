import { Link } from "react-router-dom";
import { MdLocalConvenienceStore } from "react-icons/md";
import '../../App.css';

const Navbar = () => {
  return (
    <header>
      <h1 className="Navbar">CS340 Group 131 Project</h1>
      <nav className="nav-nav">
        <ul>
          <li className="nav-element">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-element"><Link to="/Customers" className="nav-link">Customers</Link></li>
          <li className="nav-element"><Link to="/CustomerProducts" className="nav-link">Customer Products</Link></li>
          <li className="nav-element"><Link to="/Products" className="nav-link">Products</Link></li>
          <li className="nav-element"><Link to="/Memberships" className="nav-link">Memberships</Link></li>
          <li className="nav-element"><Link to="/Transactions" className="nav-link">Transactions</Link></li>
          <li className="nav-element"><Link to="/TransactionDetails" className="nav-link">Transaction Details</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
