export const tailwindStyle = { 
    subNavigation: 'mx-auto my-0 backdrop-blur-xl flex flex-row fixed justify-evenly gap-10 z-10 items-center w-[370px] md:w-[600px] lg:w-[800px] h-[50px] py-0 px-3 lg:px-[13px] left-0 right-0 top-[2%] lg:top-[15%] rounded-[200px] border-[1px] border-white/[.06] bg-white/[.05]',
    paragraph: 'focus:outline-none placeholder-gray-100/[.09] text-white no-underline font-bold leading-[1px] tracking-widest text-[0.55rem] lg:text-xs uppercase bg-transparent'
}

export const Loading = ({ state = false }) => {
    return (
        <>
            {state && (
                <div className="flex w-screen h-screen flex-col justify-center items-center z-50">
                    <p className={tailwindStyle.paragraph}>loading</p>
                </div>
            )}
        </>
    )
}
