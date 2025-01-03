import { Routes, Route, Link } from "react-router-dom";
import CreateEntity from "../components/reusable_comps/CreateEntity";
import EntityTable from "../components/reusable_comps/EntityTable";
import TableRow from "../components/reusable_comps/TableRow";
import UpdateEntity from "../components/reusable_comps/UpdateEntity";

function ProductsPage() {
  return (
    <div>
      <h1 className="page-header">Products Page</h1>
      <nav className="page-links">
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
        <Route path="/add" element={
          <CreateEntity
            fields={["productID", "productName", "productPrice", "productCost"]}
            labels={["Product ID", "Product Name", "Product Price", "Product Cost"]}
            pk = "productID"
            formTitle="Create Product"
            endpoint="Products"
        />}/>
        <Route path="/" element={
          <EntityTable 
            columns={["productID", "productName", "productPrice", "productCost"]}
            labels={["Product ID", "Product Name", "Product Price", "Product Cost"]}
            RowComponent={TableRow}
            endpoint="Products"
            entityName="Products"
            entityId="productID"
          />
        }/>
        <Route path="/edit/:id" element={
          <UpdateEntity
            entityName="Products"
            pk = "productID"
            fields={["productID", "productName", "productPrice", "productCost"]}
            redirectPath="/Products"
            entityId="productID"
        />}/>
      </Routes>
    </div>
  );
}

export default ProductsPage;
