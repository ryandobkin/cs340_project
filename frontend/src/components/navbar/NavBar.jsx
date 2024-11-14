import { Link } from "react-router-dom";
import { MdLocalConvenienceStore } from "react-icons/md";

const Navbar = () => {
  return (
    <header>
      <div>
        <Link to="/">
          <MdLocalConvenienceStore size={80} />
        </Link>
      </div>
      <h1>CS340 Group 131 Project</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li><Link to="/Customers">Customers</Link></li>
          <li><Link to="/CustomerProducts">Customer Products</Link></li>
          <li><Link to="/Products">Products</Link></li>
          <li><Link to="/Memberships">Memberships</Link></li>
          <li><Link to="/Transactions">Transactions</Link></li>
          <li><Link to="/TransactionDetails">Transaction Details</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
