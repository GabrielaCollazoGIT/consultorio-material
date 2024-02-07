import{Route,BrowserRouter,Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import LoginOp from './components/LoginOp';
import Register from './components/Register';
import DoctorList from './components/doctors/DoctorList'
import './App.css';
import NavBar from './components/navBar/NavBar';
import Specialities from './components/especialidades/Specialities';
import NewDoctor from './components/doctors/NewDoctor';


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
                <Route path='/doctor' element = {<DoctorList/>}/>
                <Route path='/doctors/new' element = {<NewDoctor/>}/>
                <Route path='/especialidades' element = {<Specialities/>}/>
                <Route path='/turnos' element = {''}/>

                </Route>
            </Routes>
          </BrowserRouter>
          
    </div>
  );
}

export default App;
