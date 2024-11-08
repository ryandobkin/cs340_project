import { Routes, Route, Link } from "react-router-dom";
import CreateTransactionDetail from "../components/TransactionDetails/CreateTransactionDetail";
import TransactionDetailTable from "../components/TransactionDetails/TransactionDetailTable";
import UpdateTransactionDetail from "../components/TransactionDetails/UpdateTransactionDetail";

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
        <Route path="/" element={<TransactionDetailTable />} />
        <Route path="/add" element={<CreateTransactionDetail />} />
        <Route path="/edit/:id" element={<UpdateTransactionDetail />} />
      </Routes>
    </div>
  );
}

export default TransactionDetailsPage;
