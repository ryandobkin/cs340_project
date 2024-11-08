import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./TransactionDetailTableRow";
import axios from "axios";

const TransactionDetailsTable = () => {
  const [transactionDetails, setTransactionDetails] = useState([]);

  const fetchTransactionDetails = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "transactionDetails";
      const response = await axios.get(URL);
      setTransactionDetails(response.data);
    } catch (error) {
      alert("Error fetching transactionDetails from the server.");
      console.error("Error fetching transactionDetails:", error);
    }
  };

  useEffect(() => {
    fetchTransactionDetails();
  }, []);

  return (
    <div>
      <h2>TransactionDetails Table</h2>
      {transactionDetails.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No transactionDetails found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>transactDetailsID</th>
              <th>transactID</th>
              <th>productID</th>
              <th>membershipID</th>
              <th>unitPrice</th>
              <th>orderQty</th>
              <th>orderTotal</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {transactionDetails.map((transactionDetails) => (
              <TableRow key={transactionDetails.id} transactionDetails={transactionDetails} fetchTransactionDetails={fetchTransactionDetails} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionDetailsTable;
