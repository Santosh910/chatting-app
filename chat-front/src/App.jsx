
import './App.css';
import { Navigate,Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import {AuthContext} from "./context/AuthContext"
import { useContext } from 'react';

function App() {
  const {authUser} = useContext(AuthContext)
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
           {/* <Route path='/' element={<Home/> }/> */}
           <Route path='/' element={authUser?<Home/> : <Navigate to={"/login"}/>}/>
           {/* <Route path='/login' element={<Login/> }/> */}
           <Route path='/login' element={authUser?<Navigate to='/'/>:<Login/> }/>
           <Route path='/signup' element={authUser?<Navigate to='/'/>:<Signup/>}/>
           {/* <Route path='/signup' element={<Signup/>}/> */}
      </Routes> 
      

    </div>
  );
}

export default App;
