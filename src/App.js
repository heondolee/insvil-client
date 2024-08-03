import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Long from './components/Long';
import Car from './components/Car';
import Normal from './components/Normal';
import Employee from './components/Employee';
import BranchDetail from './components/BranchDetail';
import TeamDetail from './components/TeamDetail';
import InfoDetail from './components/InfoDetail';

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/long" element={<Long />} />
      <Route path="/car" element={<Car/>} />
      <Route path="/normal" element={<Normal/>} />
      <Route path="/employee" element={<Employee />} />
      <Route path="/employee/:branchName/:teamName/:userName" element={<InfoDetail />} />
      <Route path="/employee/:branchName/:teamName" element={<TeamDetail />} />
      <Route path="/employee/:branchName" element={<BranchDetail />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
  );
}

export default App;
