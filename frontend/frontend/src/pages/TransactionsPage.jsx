import { Routes, Route, Link } from "react-router-dom";
import CreateEntity from "../components/reusable_comps/CreateEntity";
import EntityTable from "../components/reusable_comps/EntityTable";
import TableRow from "../components/reusable_comps/TableRow";
import UpdateEntity from "../components/reusable_comps/UpdateEntity";

function TransactionsPage() {
  return (
    <div>
      <h1>Transactions Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/transactions">Transactions Table</Link>
          </li>
          <li>
            <Link to="/transactions/add">Add Transactions</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/add" element={
          <CreateEntity
            fields={["transactID", "customerID", "transactDate", "transactTotal"]}
            labels={["Transaction ID", "Customer ID", "Transaction Date", "Transaction Total"]}
            formTitle="Create Transactions"
            endpoint="Transactions"
        />}/>
        <Route path="/" element={
          <EntityTable 
            columns={["transactID", "customerID", "transactDate", "transactTotal"]}
            labels={["Transaction ID", "Customer ID", "Transaction Date", "Transaction Total"]}
            RowComponent={TableRow}
            endpoint="Transactions"
            entityName="Transactions"
            entityId="transactID"
          />
        }/>
        <Route path="/edit/:id" element={
          <UpdateEntity
            entityName="Transactions"
            fields={["transactID", "customerID", "transactDate", "transactTotal"]}
            redirectPath="/Transactions"
            entityId="transactID"
        />}/>
      </Routes>
    </div>
  );
}

export default TransactionsPage;
