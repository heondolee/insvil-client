import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Long from './components/Long';
import Car from './components/Car';
import Home from './components/Home';
import Normal from './components/Normal';
import Employee from './components/Employee';

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/long" element={<Long />} />
      <Route path="/home" element={<Home />} />
      <Route path="/car" element={<Car/>} />
      <Route path="/normal" element={<Normal/>} />
      <Route path="/employee" element={<Employee />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
  );
}

export default App;
