import { Routes, Route, Link } from "react-router-dom";
import CreateMembership from "../components/Memberships/CreateMembership";
import MembershipTable from "../components/Memberships/MembershipTable";
import UpdateMembership from "../components/Memberships/UpdateMembership";

function MembershipsPage() {
  return (
    <div>
      <h1>Memberships Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/memberships">Memberships Table</Link>
          </li>
          <li>
            <Link to="/memberships/add">Add Memberships</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<MembershipTable />} />
        <Route path="/add" element={<CreateMembership />} />
        <Route path="/edit/:id" element={<UpdateMembership />} />
      </Routes>
    </div>
  );
}

export default MembershipsPage;
