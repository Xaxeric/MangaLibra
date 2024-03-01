import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <header id="myHeader" className='z-[999] relative'>
                <nav className='mx-auto my-0 backdrop-blur-xl flex flex-row fixed justify-evenly gap-3 lg:gap-10 z-10 items-center w-[350px] h-[60px] lg:w-[500px] lg:h-[100px] py-0 px-[20px] left-0 right-0 bottom-7 lg:top-10 rounded-[200px] border-[1px] border-white/[.06] bg-white/[.05]'>
                    <Link to="/">Home</Link>
                    <Link to="/explore">Explore</Link>
                    <Link to="/about">About</Link>
                </nav>
            </header>
        </>
    )
}

export default Header
