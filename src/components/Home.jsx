import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <main>
            <div className="relative flex flex-col h-[100vh] items-center justify-center bg-black transition-bg">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="jumbo absolute -inset-[10px] opacity-100"></div>
                </div>
                <h1 className="relative flex items-center text-5xl lg:text-7xl font-bold text-white transition-colors">
                    Manga
                    <span className="ml-1 rounded-xl bg-current p-2 text-[0.8em] leading-none">
                        <span className="text-black">Libra</span>
                    </span>
                </h1>
                <p className='mt-5 tracking-wider font-semibold text-white text-wrap w-[27em] lg:w-[29em] text-center leading-5 items-center text-sm z-50'>Explore, Immerse, Repeat: Your Ultimate Manga Odyssey!</p>
                <Link to="/explore" class="mt-5 relative inline-block px-4 py-2 font-medium group">
                    <span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-white group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                    <span class="absolute inset-0 w-full h-full bg-black border-2 border-white group-hover:bg-white"></span>
                    <span class="relative text-white group-hover:text-black ">Get Started</span>
                </Link>
            </div>
        </main>
    )
}
