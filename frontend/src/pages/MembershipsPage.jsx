import { Routes, Route, Link } from "react-router-dom";
import CreateEntity from "../components/reusable_comps/CreateEntity";
import EntityTable from "../components/reusable_comps/EntityTable";
import TableRow from "../components/reusable_comps/TableRow";
import UpdateEntity from "../components/reusable_comps/UpdateEntity";

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
        <Route path="/add" element={
          <CreateEntity
            fields={["membershipID", "membershipPrice", "renewPeriod", "gymAccess"]}
            labels={["Membership ID", "Membership Price", "Renew Period", "Gym Access"]}
            formTitle="Create Membership"
            endpoint="Memberships"
        />}/>
        <Route path="/" element={
          <EntityTable 
            columns={["membershipID", "membershipPrice", "renewPeriod", "gymAccess"]}
            labels={["Membership ID", "Membership Price", "Renew Period", "Gym Access"]}
            RowComponent={TableRow}
            endpoint="Memberships"
            entityName="Memberships"
          />
        }/>
        <Route path="/edit/:id" element={
          <UpdateEntity
            entityName="Memberships"
            fields={["membershipID", "membershipPrice", "renewPeriod", "gymAccess"]}
            redirectPath="/Memberships"
        />}/>
      </Routes>
    </div>
  );
}

export default MembershipsPage;
