import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, PrivateRoute } from './components/Context/AuthProvider';
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
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" 
            element={
              <PrivateRoute>
                <Long />
              </PrivateRoute>
            } 
          />
          <Route path="/login" 
            element={
              <Login />
            } 
          />
          <Route 
            path="/long" 
            element={
              <PrivateRoute>
                <Long />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/long/new" 
            element={
              <PrivateRoute>
                <LongDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/long/:id" 
            element={
              <PrivateRoute>
                <LongDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/car" 
            element={
              <PrivateRoute>
                <Car />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/car/:id" 
            element={
              <PrivateRoute>
                <CarDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/reference" 
            element={
              <PrivateRoute>
                <Reference />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/reference/:id" 
            element={
              <PrivateRoute>
                <ReferenceDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/reference/new" 
            element={
              <PrivateRoute>
                <ReferenceDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/normal" 
            element={
              <PrivateRoute>
                <Normal />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/normal/new" 
            element={
              <PrivateRoute>
                <NormalDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/normal/:id" 
            element={
              <PrivateRoute>
                <NormalDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/employee" 
            element={
              <PrivateRoute>
                <Employee />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/employee/new" 
            element={
              <PrivateRoute>
                <InfoDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/customer/new" 
            element={
              <PrivateRoute>
                <CustomerDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/customer/:id" 
            element={
              <PrivateRoute>
                <CustomerDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/customer" 
            element={
              <PrivateRoute>
                <Customer />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/employee/:branchName/:teamName/:userName" 
            element={
              <PrivateRoute>
                <InfoDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/employee/:branchName/:teamName" 
            element={
              <PrivateRoute>
                <TeamDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/employee/:branchName" 
            element={
              <PrivateRoute>
                <BranchDetail />
              </PrivateRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
