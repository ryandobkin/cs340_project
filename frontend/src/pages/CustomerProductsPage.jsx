import { Routes, Route, Link } from "react-router-dom";
import CreateCustomerProduct from "../components/CustomerProducts/CreateCustomerProduct";
import CustomerProductTable from "../components/CustomerProducts/CustomerProductTable";
import UpdateCustomerProduct from "../components/CustomerProducts/UpdateCustomerProduct";

function CustomerProductsPage() {
  return (
    <div>
      <h1>BSG CustomerProducts Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/customerProducts">Customer Products Table</Link>
          </li>
          <li>
            <Link to="/customerProducts/add">Add Customer Products</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<CustomerProductTable />} />
        <Route path="/add" element={<CreateCustomerProduct />} />
        <Route path="/edit/:id" element={<UpdateCustomerProduct />} />
      </Routes>
    </div>
  );
}

export default CustomerProductsPage;
