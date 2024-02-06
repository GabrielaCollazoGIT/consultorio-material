import{Route,BrowserRouter,Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import LoginOp from './components/LoginOp';
import Register from './components/Register';
import './App.css';
import { NavBar } from './components/NavBar';


function App() {
  
  return (
    <div className="App">
  
        <NavBar />

        <BrowserRouter>
            <Routes>
            <Route path='/' element = {<Home/>}/>
              <Route path='/login' element = {<LoginOp/>}/>
              <Route path='/signup' element = {<Register/>}/>
              
                <Route  element = { <ProtectedRoute />}>
                <Route path='/doctor' element = {''}/>
                <Route path='/doctors/new' element = {''}/>
                <Route path='/especialidades' element = {''}/>
                <Route path='/turnos' element = {''}/>

                </Route>
            </Routes>
          </BrowserRouter>
          
    </div>
  );
}

export default App;
