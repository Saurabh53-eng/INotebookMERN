import './App.css';
import { useState } from 'react';
import About from './components/About';
import AddNote from './components/AddNote';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState'
import Alert from './components/Alert';

import Login from './components/Login';
import Navbar from './components/Navbar';
import SignUp from './components/Signup';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (msg, type) => {
    setAlert({
      msg: msg,
      type: type,
    });
    setTimeout(() => {
      setAlert(null)
    }, 2500)
  }

  return (
    <div className='app'>

      <NoteState>
        <BrowserRouter>
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />

          <div className='container my-4'>
            <Routes>
              <Route path="/" element={<AddNote showAlert={showAlert} />} />
              <Route path="/about" element={<About showAlert={showAlert} />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<SignUp showAlert={showAlert} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
