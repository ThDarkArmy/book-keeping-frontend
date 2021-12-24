import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import Home from './pages/Home'
import LoginRegister from './pages/LoginRegister'


const App = ()=> {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login-register" element={<LoginRegister/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="*" />
      </Routes>
    </Router>
  );
}

export default App;
