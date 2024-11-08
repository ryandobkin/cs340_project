import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./ProductTableRow";
import axios from "axios";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "products";
      const response = await axios.get(URL);
      setProducts(response.data);
    } catch (error) {
      alert("Error fetching products from the server.");
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products Table</h2>
      {products.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No products found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>productID</th>
              <th>productName</th>
              <th>productPrice</th>
              <th>productCost</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <TableRow key={product.id} product={product} fetchProducts={fetchProducts} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductsTable;
