import './App.css';
import * as React from 'react';
import { Contact } from './components/Contact.jsx';
import { Main } from './components/Main.jsx';
import { NavBar } from './components/NavBar.jsx';
import { About } from './components/About.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <div className='bg-gradient-to-b from-black via-stone-950 from-20% via-45% to-yellow-900 h-screen text-yellow-100'>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Main />}/>
                    <Route path="/about" element={<About />}/>
                    <Route path="/contact" element={<Contact />}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App
