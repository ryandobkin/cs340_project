import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./CustomerProductTableRow";
import axios from "axios";

const CustomerProductsTable = () => {
  const [customerProducts, setCustomerProducts] = useState([]);

  const fetchCustomerProducts = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "customerProducts";
      const response = await axios.get(URL);
      setCustomerProducts(response.data);
    } catch (error) {
      alert("Error fetching customerProducts from the server.");
      console.error("Error fetching customerProducts:", error);
    }
  };

  useEffect(() => {
    fetchCustomerProducts();
  }, []);

  return (
    <div>
      <h2>Customer Products Table</h2>
      {customerProducts.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No customerProducts found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>customerProductID</th>
              <th>customerID</th>
              <th>prodcutID</th>
              <th>membershipID</th>
              <th>quantity</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {customerProducts.map((customerProduct) => (
              <TableRow key={customerProduct.id} customerProduct={customerProduct} fetchCustomerProducts={fetchCustomerProducts} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerProductsTable;
