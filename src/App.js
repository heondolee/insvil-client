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
              <Login />
            } 
          />
          <Route 
            path="/login" 
            element={
              <Login />
            } 
          />
          <Route 
            path="/long" 
            element={
              <PrivateRoute role="1,3,4">
                <Long />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/long/new" 
            element={
              <PrivateRoute role="1,3,4">
                <LongDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/long/:id" 
            element={
              <PrivateRoute role="1,3,4">
                <LongDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/car" 
            element={
              <PrivateRoute role="1,2,3,4">
                <Car />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/car/:id" 
            element={
              <PrivateRoute role="1,2,3,4">
                <CarDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/reference" 
            element={
              <PrivateRoute role="1">
                <Reference />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/reference/:id" 
            element={
              <PrivateRoute role="1">
                <ReferenceDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/reference/new" 
            element={
              <PrivateRoute role="1">
                <ReferenceDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/normal" 
            element={
              <PrivateRoute role="1,3,4">
                <Normal />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/normal/new" 
            element={
              <PrivateRoute role="1,3,4">
                <NormalDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/normal/:id" 
            element={
              <PrivateRoute role="1,3,4">
                <NormalDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/employee" 
            element={
              <PrivateRoute role="1">
                <Employee />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/employee/new" 
            element={
              <PrivateRoute role="1">
                <InfoDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/customer/new" 
            element={
              <PrivateRoute role="1">
                <CustomerDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/customer/:id" 
            element={
              <PrivateRoute role="1">
                <CustomerDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/customer" 
            element={
              <PrivateRoute role="1">
                <Customer />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/employee/:branchName/:teamName/:userName" 
            element={
              <PrivateRoute role="1">
                <InfoDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/employee/:branchName/:teamName" 
            element={
              <PrivateRoute role="1">
                <TeamDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/employee/:branchName" 
            element={
              <PrivateRoute role="1">
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
