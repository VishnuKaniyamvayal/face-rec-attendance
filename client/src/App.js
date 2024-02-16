import './App.css';
import Detector from './Pages/Detector';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './Pages/Login';
import AdminPannel from './Pages/AdminPannel';
import Students from './Pages/Students';
import AddStudent from './Pages/AddStudent'
import { ToastContainer } from 'react-toastify';
import { AuthContext } from "./Context/AuthContext";
import EditStudent from "./Pages/EditStudent"


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Detector/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/dashboard'  element={<AdminPannel/>} />
          <Route path='/students' element={<Students/>} />
          <Route path='/addstudent' element={<AddStudent/>} />
          <Route path='/editstudent/:id' element={<EditStudent/>} />
        </Routes>
      </Router>
      <ToastContainer/>
    </div>
  );
}

export default App;
