import { Routes, Route, Link } from "react-router-dom";
import CreateProduct from "../components/Products/CreateProduct";
import ProductTable from "../components/Products/ProductTable";
import UpdateProduct from "../components/Products/UpdateProduct";

function ProductsPage() {
  return (
    <div>
      <h1>Products Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/products">Products Table</Link>
          </li>
          <li>
            <Link to="/products/add">Add Products</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<ProductTable />} />
        <Route path="/add" element={<CreateProduct />} />
        <Route path="/edit/:id" element={<UpdateProduct />} />
      </Routes>
    </div>
  );
}

export default ProductsPage;
