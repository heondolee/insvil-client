import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Long from './components/Long';
import Car from './components/Car';
import Normal from './components/Normal';

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/long" element={<Long />} />
      <Route path="/car" element={<Car/>} />
      <Route path="/normal" element={<Normal/>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
  );
}

export default App;
