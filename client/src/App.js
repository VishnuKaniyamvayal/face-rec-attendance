import './App.css';
import Detector from './Pages/Detector';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './Pages/Login';
import AdminPannel from './Pages/AdminPannel';
import Students from './Pages/Students';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Detector/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/dashboard' element={<AdminPannel/>} />
          <Route path='/students' element={<Students/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
