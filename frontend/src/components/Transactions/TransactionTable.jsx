import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./TransactionTableRow";
import axios from "axios";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "transactions";
      const response = await axios.get(URL);
      setTransactions(response.data);
    } catch (error) {
      alert("Error fetching transactions from the server.");
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Transactions Table</h2>
      {transactions.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No transactions found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>transactID</th>
              <th>customerID</th>
              <th>transactDate</th>
              <th>transactTotal</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} transaction={transaction} fetchTransactions={fetchTransactions} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionsTable;
