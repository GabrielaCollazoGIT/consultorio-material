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
import TurnNew from './components/turns/TurnNew';
import RecoveryPassword from './components/RecoveryPassword';
import DoctorAdmins from './components/doctors/DoctorAdmins';
import UpdateTurn from './components/turns/UpdateTurn';
import AppoinmentForm from './components/turns/Appoinments.form';





function App() {
  
  

  return (
    <div className="App">
    <BrowserRouter>
        <NavBar />
            <Routes>
            <Route path='/' element = {<Home/>}/>
              <Route path='/login' element = {<LoginOp/>}/>
              <Route path='/password-recovery' element = {<RecoveryPassword/>}/>
              <Route path='/signup' element = {<Register/>}/>
              
                <Route  element = { <ProtectedRoute />}>
                <Route path='/doctor/:specialityId' element = {<DoctorList/>}/>
                <Route path='/doctors/new' element = {<NewDoctor/>}/>
                <Route path='/doctors/admin' element = {<DoctorAdmins/>}/>
                <Route path='/doctors/update/:doctorId' element = {<UpdateDoctor/>}/>
                <Route path='/especialidades' element = {<Specialities/>}/>
                <Route path='/turns/:doctorId' element = {<AppointmentList/>}/>
                <Route path='/turns/user/:userDni' element = {<UserAppointments/>}/>
                <Route path='/turns/new' element = {<TurnNew/>}/>
                <Route path='/turns/turn-form/' element = {<AppoinmentForm/>}/>
                <Route path='turns/update/:id' element  = {<UpdateTurn/> }/>
                
                </Route>
            </Routes>
          </BrowserRouter>
          
    </div>
  );
}

export default App;
