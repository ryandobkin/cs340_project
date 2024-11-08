import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CustomersPage from "./pages/CustomersPage";
import CustomerProductsPage from "./pages/CustomerProductsPage";
import MembershipsPage from "./pages/MembershipsPage";
import ProductsPage from "./pages/ProductsPage";
import TransactionsPage from "./pages/TransactionsPage";
import TransactionDetailsPage from "./pages/TransactionDetailsPage";
import PeoplePage from "./pages/PeoplePage";
import Navbar from "./components/navbar/NavBar";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/People/*" element={<PeoplePage />} />
        <Route path="/Customers/*" element={<CustomersPage />} />
        <Route path="/CustomerProducts/*" element={<CustomerProductsPage />} />
        <Route path="/Memberships/*" element={<MembershipsPage />} />
        <Route path="/Products/*" element={<ProductsPage />} />
        <Route path="/Transactions/*" element={<TransactionsPage />} />
        <Route path="/TransactionDetails/*" element={<TransactionDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
