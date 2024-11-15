import { Routes, Route, Link } from "react-router-dom";
import CreateEntity from "../components/reusable_comps/CreateEntity";
import EntityTable from "../components/reusable_comps/EntityTable";
import TableRow from "../components/reusable_comps/TableRow";
import UpdateEntity from "../components/reusable_comps/UpdateEntity";

function TransactionDetailsPage() {
  return (
    <div>
      <h1 className="page-header">Transaction Details Page</h1>
      <nav className="page-links">
        <ul>
          <li>
            <Link to="/transactionDetails">Transaction Details Table</Link>
          </li>
          <li>
            <Link to="/transactionDetails/add">Add Transaction Details</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/add" element={
          <CreateEntity
            fields={["transactDetailsID", "transactID", "productID", "membershipID", "unitPrice", "orderQty", "orderTotal"]}
            labels={["Transact Details ID", "Transact ID", "Product ID", "Membership ID", "Unit Price", "Order Quantity", "Order Total"]}
            formTitle="Create Transaction Details"
            endpoint="TransactionDetails"
        />}/>
        <Route path="/" element={
          <EntityTable 
            columns={["transactDetailsID", "transactID", "productID", "membershipID", "unitPrice", "orderQty", "orderTotal"]}
            labels={["Transact Details ID", "Transact ID", "Product ID", "Membership ID", "Unit Price", "Order Quantity", "Order Total"]}
            RowComponent={TableRow}
            endpoint="transactionDetails"
            entityName="TransactionDetails"
            entityId="transactDetailsID"
          />
        }/>
        <Route path="/edit/:id" element={
          <UpdateEntity
            entityName="TransactionDetails"
            fields={["transactDetailsID", "transactID", "productID", "membershipID", "unitPrice", "orderQty", "orderTotal"]}
            redirectPath="/TransactionDetails"
            entityId="transactDetailsID"
        />}/>
      </Routes>
    </div>
  );
}

export default TransactionDetailsPage;
