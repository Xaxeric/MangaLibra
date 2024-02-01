import { useState } from "react"
import { useEffect } from "react"
import handleAPI from "../handleAPI"

export const Order = () => {
    const [mecha, setMecha] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [limit, setLimit] = useState(false)

    const handleMoreClick = () => setCurrentPage((current) => current + 1);
    const handleDelete = (id) => {
        handleAPI.delete(id)
            .then(setMecha((item) => {
                const dataToRemoveIndex = item.findIndex(item => item.id === id)
                const newData = item.splice(dataToRemoveIndex, 1)
                return [...newData]
            }))
    }
    useEffect(() => {
        const loadPage = async() => {
            setLoading(true)
            try {
                const data = await handleAPI.get(currentPage);
                if (currentPage > data.last) return setLimit(true);
                setMecha((prevData) => (currentPage === 1 ? data.data : [...prevData, ...data.data]));
            } catch(error) {
                if(error instanceof Error) console.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        loadPage()
    }, [currentPage])

    return (
        <>
            {!loading && (
                <div>
                    <div className="m-10 flex flex-wrap flex-row justify-evenly gap-10">
                        { 
                            mecha.map((item, id) => (
                                <div key={id} className="p-5 flex flex-col gap-5 bg-stone-950 rounded-md">
                                    <div className="flex flex-col uppercase gap-1">
                                        <h1 className="text-l font-bold">{item.id}. {item.name}</h1>
                                        <p className="italic">${item.price}</p>
                                        <p>{item.quantity}</p>
                                    </div>
                                    <div className="flex flex-flex-row gap-10">
                                        <button onClick={() => handleDelete(item.id)} className="bg-red-900 py-2 px-3 rounded-full">Delete</button>
                                        <span className="py-2 p-3"></span>
                                    </div>
                                </div>
                            )) 
                        }
                    </div>
                    {!limit && (
                        <button onClick={handleMoreClick} className="bg-blue-500">More</button>
                    )}
                </div>
            )}
            {loading && (
                <h1>Loading</h1>
            )}
        </>
    )
}
