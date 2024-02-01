import './App.css';
import * as React from 'react';
import { Contact } from './components/Contact.jsx';
import { Main } from './components/Main.jsx';
import { Order } from './components/Order.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <div className='bg-gradient-to-b from-black via-stone-950 from-20% via-45% to-yellow-900 h-screen text-yellow-100'>

                <nav className='font-light bg-transparent flex p-3 justify-between px-10 tracking-widest'>
                    <div></div>
                    <ul className="flex gap-11 h-12 items-center uppercase">
                        <li className='hover:font-normal'>
                            <Link to="/">Home</Link>
                        </li>
                        <li className='hover:font-normal'>
                            <Link to="/order">Order</Link>
                        </li>
                        <li className='hover:font-normal'>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Main />}/>
                    <Route path="/order" element={<Order />}/>
                    <Route path="/contact" element={<Contact />}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
