import './App.css';
import * as React from 'react';
import { About } from './components/About.jsx';
import { Home } from './components/Home.jsx';
import { Explore } from './components/Explore.jsx';
import { Detail } from './components/Detail.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';

const App = () => {
    return (
        <BrowserRouter>
            <>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/explore" element={<Explore />}/>
                    <Route path="/explore/query/:query" element={<Explore />}/>
                    <Route path="/about" element={<About />}/>
                    <Route path='/explore/:id' element={<Detail />} />
                </Routes>
            </>
        </BrowserRouter>
    )
}

export default App
