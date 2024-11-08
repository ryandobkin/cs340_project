import { Routes, Route, Link } from "react-router-dom";
import CreateTransaction from "../components/Transactions/CreateTransaction";
import TransactionTable from "../components/Transactions/TransactionTable";
import UpdateTransaction from "../components/Transactions/UpdateTransaction";

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
        <Route path="/" element={<TransactionTable />} />
        <Route path="/add" element={<CreateTransaction />} />
        <Route path="/edit/:id" element={<UpdateTransaction />} />
      </Routes>
    </div>
  );
}

export default TransactionsPage;
