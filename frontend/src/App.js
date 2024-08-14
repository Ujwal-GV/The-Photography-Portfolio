import './App.css';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import MainPage from './components/MainPage';
import PhotoUpload from './components/PhotoUpload';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={ Login } />
        <Route path='/signup' Component={ SignUp } />
        <Route path='/main' Component={ MainPage } />
        <Route path='/upload' Component={ PhotoUpload } />
      </Routes>
    </Router>
  );
}

export default App;
