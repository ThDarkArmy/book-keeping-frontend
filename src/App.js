import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import LoginRegister from './pages/LoginRegister'
import Customer from './pages/Customer'
import About from './pages/About'


const App = ()=> {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login-register" element={<LoginRegister/>}/>
        <Route path="/customer/:custId" element={<Customer/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="*" />
      </Routes>
    </Router>
  );
}

export default App;
