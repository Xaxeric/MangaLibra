import React from 'react'
import { Link } from 'react-router-dom';

export const NavBar = () => {
    return (
        <nav className='font-light bg-transparent flex p-3 justify-between px-10 tracking-widest'>
            <div></div>
            <ul className="flex gap-11 h-12 items-center uppercase">
                <li className='hover:font-normal'>
                    <Link to="/">Home</Link>
                </li>
                <li className='hover:font-normal'>
                    <Link to="/about">About</Link>
                </li>
                <li className='hover:font-normal'>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    )
}
