import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import SignUp from './Components/SignUp';
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import AddProduct from './Components/AddProduct';
import UpdateProduct from './Components/UpdateProduct';
import Products from './Components/Products';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
        <Routes>
          <Route element={<PrivateComponent/>}>
          <Route path="/" element={<Products/>} />
          <Route path="/add" element={<AddProduct/>} />
          <Route path="/update/:id" element={<UpdateProduct/>} />
          <Route path="/logout" element={<h1>Product Logout Component</h1>} />
          <Route path="/profile" element={<h1>Product Profile Component</h1>} />
          </Route>
          <Route path="/signup" element={<SignUp/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
