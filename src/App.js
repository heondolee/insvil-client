import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Long from './components/Long/Long';
import Car from './components/Car';
import Normal from './components/Normal';
import Employee from './components/Employee';
import BranchDetail from './components/BranchDetail';
import TeamDetail from './components/TeamDetail';
import InfoDetail from './components/InfoDetail';
import Reference from './components/Reference';
import Customer from './components/Customer';
import CustomerDetail from './components/CustomerDetail';
import LongDetail from './components/LongDetail';
import ReferenceDetail from './components/ReferenceDetail';
import NormalDetail from './components/NormalDetail';

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/long" element={<Long />} />
      <Route path="/long/:contractorName" element={<LongDetail/>} />
      <Route path="/car" element={<Car/>} />
      <Route path="/reference" element={<Reference/>} />
      <Route path="/reference/:id" element={<ReferenceDetail/>} />
      <Route path="/reference/new" element={<ReferenceDetail />} />
      <Route path="/normal" element={<Normal/>} />
      <Route path="/normal/:normalName" element={<NormalDetail />} />
      <Route path="/employee" element={<Employee />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/customer/:customerName" element={<CustomerDetail />} />
      <Route path="/employee/:branchName/:teamName/:userName" element={<InfoDetail />} />
      <Route path="/employee/:branchName/:teamName" element={<TeamDetail />} />
      <Route path="/employee/:branchName" element={<BranchDetail />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
  );
}

export default App;
