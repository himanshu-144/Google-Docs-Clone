
import './App.css';
import {BrowserRouter, Route, Routes } from "react-router-dom"
import Login from './pages/Login';
import Home from './pages/Home';
import { app ,database} from './firebaseConfig';
import Editor from './components/Editor';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
       <h1>Google Docs</h1>
        <Routes>
          <Route path='/home' element={<Home database={database} />}/>
          <Route path='/' element={<Login />} />
          <Route path='/editor/:id' element={<Editor database={database}/>} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
