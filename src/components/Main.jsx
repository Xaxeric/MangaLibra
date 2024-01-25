import React, { useEffect, useState } from 'react';
import img from '../assets/84063290e5c0f54b15d85107905cd1901.jpg'

export const Main = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch("http://localhost:3006/mecha")
            .then(response => response.json())
            .then(json => setData(json))
    }, [])
    return (
        <main className='h-screen p-15 flex flex-col gap-10 bg-gradient-to-b from-black via-stone-950 from-20% via-45% to-yellow-900 text-yellow-100'>
            <div className='flex flex-row my-36'>
                <div className='flex flex-col font-bold tracking-wider text-center w-full h-[500px] justify-center items-start gap-5 ml-36'>
                    <h1 className='text-start text-7xl'>MechTravel</h1>
                    <p className='font-normal text-base tracking-wide text-wrap w-[25em] leading-9 text-start'>Explore Tomorrow with Mech Travel: Your Gateway to Limitless Adventures!</p>
                    <button className='mt-5 bg-yellow-500 text-black w-44 h-14 rounded-full font-semibold items-start shadow-xl'>Order Now</button>
                </div>
                <div className='flex flex-col justify-start items-end w-full mr-36'>
                    <img className='rounded-xl h-[600px] w-[400px] brightness-50 hue-rotate-60 shadow-xl' src={img} alt='Banner' />
                </div>
            </div>
            <div className='flex flex-col font-normal text-center w-full justify-center items-center gap-5'>
                <h1 className='text-start text-2xl uppercase tracking-wider'>Available Mech</h1>
                <ul className='flex flex-row font-bold bg-yellow-900 w-full justify-center items-center gap-10'>
                    {data?.map((item) => (
                        <div key={item?.id}>
                            <li>{item?.name}</li>
                            <li>{item?.price}</li>
                            <li>{item?.quantity}</li>
                        </div>
                    ))}
                </ul>
            </div>
        </main>
    )
}
