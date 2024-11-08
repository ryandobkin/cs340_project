import { Routes, Route, Link } from "react-router-dom";
import CreateCustomer from "../components/Customers/CreateCustomer";
import CustomerTable from "../components/Customers/CustomerTable";
import UpdateCustomer from "../components/Customers/UpdateCustomer";

function CustomersPage() {
  return (
    <div>
      <h1>Customers Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/customers">Customers Table</Link>
          </li>
          <li>
            <Link to="/customers/add">Add Customers</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<CustomerTable />} />
        <Route path="/add" element={<CreateCustomer />} />
        <Route path="/edit/:id" element={<UpdateCustomer />} />
      </Routes>
    </div>
  );
}

export default CustomersPage;
