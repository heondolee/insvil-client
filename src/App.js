import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Alayouts/Login';
import Long from './components/Long/Long';
import Car from './components/Car/Car';
import CarDetail from './components/Car/CarDetail';
import Normal from './components/Normal/Normal';
import Employee from './components/Employee/Employee';
import BranchDetail from './components/Employee/BranchDetail';
import TeamDetail from './components/Employee/TeamDetail';
import InfoDetail from './components/Employee/InfoDetail';
import Reference from './components/Reference/Reference';
import Customer from './components/Customer/Customer';
import CustomerDetail from './components/Customer/CustomerDetail';
import LongDetail from './components/Long/LongDetail';
import ReferenceDetail from './components/Reference/ReferenceDetail';
import NormalDetail from './components/Normal/NormalDetail';

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/long" element={<Long />} />
      <Route path="/long/new" element={<LongDetail />} />
      <Route path="/long/:id" element={<LongDetail/>} />
      <Route path="/car" element={<Car/>} />
      <Route path="/car/:id" element={<CarDetail/>} />
      <Route path="/reference" element={<Reference/>} />
      <Route path="/reference/:id" element={<ReferenceDetail/>} />
      <Route path="/reference/new" element={<ReferenceDetail />} />
      <Route path="/normal" element={<Normal/>} />
      <Route path="/normal/new" element={<NormalDetail />} />
      <Route path="/normal/:id" element={<NormalDetail />} />
      <Route path="/employee" element={<Employee />} />
      <Route path="/employee/new" element={<InfoDetail />} />
      <Route path="/customer/new" element={<CustomerDetail />} />
      <Route path="/customer/:id" element={<CustomerDetail />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/employee/:branchName/:teamName/:userName" element={<InfoDetail />} />
      <Route path="/employee/:branchName/:teamName" element={<TeamDetail />} />
      <Route path="/employee/:branchName" element={<BranchDetail />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
  );
}

export default App;
