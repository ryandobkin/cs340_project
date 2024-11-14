import { Routes, Route, Link } from "react-router-dom";
import CreateEntity from "../components/reusable_comps/CreateEntity";
import EntityTable from "../components/reusable_comps/EntityTable";
import TableRow from "../components/reusable_comps/TableRow";
import UpdateEntity from "../components/reusable_comps/UpdateEntity";

function TransactionDetailsPage() {
  return (
    <div>
      <h1>TransactionDetails Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/transactionDetails">TransactionDetails Table</Link>
          </li>
          <li>
            <Link to="/transactionDetails/add">Add TransactionDetails</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/add" element={
          <CreateEntity
            fields={["transactDetailsID", "transactID", "productID", "membershipID", "unitPrice", "orderQty", "orderTotal"]}
            labels={["Transact Details ID", "Transact ID", "Product ID", "Membership ID", "Unit Price", "Order Quantity", "Order Total"]}
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
          />
        }/>
        <Route path="/edit/:id" element={
          <UpdateEntity
            entityName="Customers"
            fields={["customerID", "membershipID", "name", "email", "gender", "mailAddr", "billAddr", "city", "state", "areaCode"]}
            redirectPath="/Customers"
        />}/>
      </Routes>
    </div>
  );
}

export default TransactionDetailsPage;
