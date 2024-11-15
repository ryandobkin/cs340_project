import { Routes, Route, Link } from "react-router-dom";
import CreateEntity from "../components/reusable_comps/CreateEntity";
import EntityTable from "../components/reusable_comps/EntityTable";
import TableRow from "../components/reusable_comps/TableRow";
import UpdateEntity from "../components/reusable_comps/UpdateEntity";

function CustomerProductsPage() {
  return (
    <div>
      <h1 className="page-header">Customer Products Page</h1>
      <nav className="page-links">
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
        <Route path="/add" element={
          <CreateEntity
            fields={["customerProductID", "customerID", "productID", "membershipID", "quantity"]}
            labels={["Customer Product ID", "Customer ID", "Product ID", "Membership ID", "Quantity"]}
            formTitle="Create Customer Product"
            endpoint="CustomerProducts"
        />}/>
        <Route path="/" element={
          <EntityTable 
            columns={["customerProductID", "customerID", "productID", "membershipID", "quantity"]}
            labels={["Customer Product ID", "Customer ID", "Product ID", "Membership ID", "Quantity"]}
            RowComponent={TableRow}
            endpoint="CustomerProducts"
            entityName="CustomerProducts"
            entityId="customerProductID"
          />
        }/>
        <Route path="/edit/:id" element={
          <UpdateEntity
            entityName="CustomerProducts"
            fields={["customerProductID", "customerID", "productID", "membershipID", "quantity"]}
            redirectPath="/CustomerProducts"
            entityId="customerProductID"
        />}/>
      </Routes>
    </div>
  );
}

export default CustomerProductsPage;
