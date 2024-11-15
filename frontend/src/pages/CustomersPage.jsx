import { Routes, Route, Link } from "react-router-dom";
import CreateEntity from "../components/reusable_comps/CreateEntity";
import EntityTable from "../components/reusable_comps/EntityTable";
import TableRow from "../components/reusable_comps/TableRow";
import UpdateEntity from "../components/reusable_comps/UpdateEntity";

function CustomersPage() {
  return (
    <div>
      <h1 className="page-header">Customers Page</h1>
      <nav className="page-links">
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
        <Route path="/add" element={
          <CreateEntity
            fields={["customerID", "membershipID", "name", "email", "gender", "mailAddr", "billAddr", "city", "state", "areaCode"]}
            labels={["Customer ID", "Membership ID", "Name", "Email", "Gender", "Mailing Address", "Billing Address", "City", "State", "Area Code"]}
            formTitle="Create Customer"
            endpoint="Customers"
        />}/>
        <Route path="/" element={
          <EntityTable 
            columns={["customerID", "membershipID", "name", "email", "gender", "mailAddr", "billAddr", "city", "state", "areaCode"]}
            labels={["Customer ID", "Membership ID", "Name", "Email", "Gender", "Mailing Address", "Billing Address", "City", "State", "Area Code"]}
            RowComponent={TableRow}
            endpoint="Customers"
            entityName="Customers"
            entityId="customerID"
          />
        }/>
        <Route path="/edit/:id" element={
          <UpdateEntity
            entityName="Customers"
            fields={["customerID", "membershipID", "name", "email", "gender", "mailAddr", "billAddr", "city", "state", "areaCode"]}
            redirectPath="/Customers"
            entityId="customerID"
        />}/>
      </Routes>
    </div>
  );
}

export default CustomersPage;
