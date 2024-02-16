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
import UpdateDoctor from './components/doctors/UpdateDoctor';
import AppointmentList from './components/turns/AppointmentList';
import UserAppointments from './components/turns/UserAppointment';
//import NewNavBar from './components/navBar/NewNavBar';


function App() {
  
  const navLinks = [
    {
        title: "Home", path:"/"

    },
    {
        title: "Especialidades", path:"/especialidades"

    },
    {
      title: "Turnos", path:"/turns/user/:userDni"

    },
    {
        title: "Login", path:"/login"

    },
    {
        title: "Signup", path:"/signup"

    }
    
]

  return (
    <div className="App">
  
        <NavBar navLinks={navLinks}/>
        
        <BrowserRouter>
            <Routes>
            <Route path='/' element = {<Home/>}/>
              <Route path='/login' element = {<LoginOp/>}/>
              <Route path='/signup' element = {<Register/>}/>
              
                <Route  element = { <ProtectedRoute />}>
                <Route path='/doctor/:specialityId' element = {<DoctorList/>}/>
                <Route path='/doctors/new' element = {<NewDoctor/>}/>
                <Route path='/doctors/update' element = {<UpdateDoctor/>}/>
                <Route path='/especialidades' element = {<Specialities/>}/>
                <Route path='/turns/:doctorId' element = {<AppointmentList/>}/>
                <Route path='/turns/user/:userDni' element = {<UserAppointments/>}/>
                </Route>
            </Routes>
          </BrowserRouter>
          
    </div>
  );
}

export default App;
