import{Route,BrowserRouter,Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import './App.css';
import { NavBar } from './components/NavBar';
import { Button} from '@mui/material';

function App() {
  
  return (
    <div className="App">
  
        <NavBar />
        <Button variant='contained' color='primary'>
          ir
        </Button>
    

        <BrowserRouter>
            <Routes>
            <Route path='/' element = {Home}/>
              <Route path='/login' element = {''}/>
              <Route path='/signup' element = {''}/>

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
