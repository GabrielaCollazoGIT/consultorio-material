import{Route,BrowserRouter,Routes} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <div className="App">
  <BrowserRouter>
      <Routes>
      <Route path='/' element = {''}/>
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
